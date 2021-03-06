import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { Student } from './../../Model/student.model';
import { Account } from './../../Model/account.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private afs: AngularFirestore,
    private afa: AngularFireAuth, 
    private router: Router,private accountService: AccountService) { }
  SignIn(email, password) {    
    return this.afa.signInWithEmailAndPassword(email, password)
    .then(res => {
  
      //We get student data
      this.afs.collection("Student").doc(res.user.uid).valueChanges().subscribe(data =>{
        
        // set student data      
        let student = new Student(res.user.uid,data["firstname"], data["lastname"], data["phone"],data["gender"], data["email"]);
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
      this.afs.collection("Student").doc(id).set({
        firstname: name,
        lastname: surname,
        gender: gender,
        phone: phone,
        email: email,
      }).then( res => {
        alert("Your account is succesfully created!");
      }).catch( error => {
        alert(error)
      }).catch( error => {
        alert(error)
      })
    }).catch(error => {
      alert(error);
    })
  }
  update_student(recordID, student) {
    this.afs.doc('Student/' + recordID).update(student);
  }
   // Sign-out 
   SignOut() {
    return this.afa.signOut().then(() => {  
      //this.router.navigate(['']);
     
      
    })
  }

}
