import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore'
import { Router } from '@angular/router';
import { Account } from '../Model/account.model';
import { Student } from '../Model/student.model';
import { AccountService } from './account.service';
@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  
  private loggedIn: boolean;
  collectionName = 'Course';
  constructor(private asf: AngularFirestore,
     private afa: AngularFireAuth, 
     private router: Router,private accountService: AccountService) { }

  // Login user with email/password
  SignIn(email, password) {    
    return this.afa.signInWithEmailAndPassword(email, password)
    .then(res => {
      this.loggedIn = true;
      //We get student data
      //
      this.asf.collection("Student").doc(res.user.uid).valueChanges().subscribe(data =>{
        // set student data
      
        let student = new Student(res.user.uid,data["firstname"], data["lastname"], data["phone"],data["gender"], data["email"]);

        console.log(student)
        //create account object that has sign state and student object
        let account = new Account(true, student);
        
        //set Account service to keep account object
        this.accountService.setAccount(account);

      })

     // this.router.navigateByUrl("home");
     //  console.log( 'Signin success');
    }).catch(error =>{
      alert(error)
    });
  }
  // Register user with email/password
  RegisterUser(name: string, surname: string, gender: string, phone: string, email: string, password: string) {
    //return this.afa.createUserWithEmailAndPassword(email, password);
    return this.afa.createUserWithEmailAndPassword( email, password).then( userCredentials => {
      let id = userCredentials.user.uid;
      this.asf.collection("Student").doc(id).set({
        firstname: name,
        lastname: surname,
        gender: gender,
        phone: phone,
        email: email,
      }).then( res => {
        alert("Your account is succesfully created");
      }).catch( error => {
        alert(error)
      }).catch( error => {
        alert(error)
      })
    }).catch(error => {
      alert(error);
    })
  }
  getInstructor(userID){
    return this.asf.collection('Instructor', ref => ref.where('userID','==', userID)).snapshotChanges();
  }
  SignOut() {
    return this.afa.signOut().then(() => {  
      this.loggedIn = false;
      this.router.navigate(['']);
    })
  }


}
