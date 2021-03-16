import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AccountService } from '../Instructor-Service/account.service';
import { Student } from '../../Model/student.model';
import { Account } from '../../Model/Instructor-Model/account.model';
import { DatabaseService } from '../database.service';
import { InstructorClass } from 'src/app/Model/Instructor-Model/instructor';
import firebase from 'firebase/app';
import { Instructor } from 'src/app/Model/instructor';
import { InstructorInfo } from 'src/app/Model/Instructor-Model/instructor_Info';
import { finalize } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  user = {} as InstructorInfo;
  instructor = new InstructorClass;
  storage: any;

  video;
  constructor(private afs: AngularFirestore,
    private afa: AngularFireAuth, 
    private router: Router,private accountService: AccountService, private dbs: DatabaseService) {
      this.instructor = new InstructorClass();
     }
  SignIn(email, password) {    
    return this.afa.signInWithEmailAndPassword(email, password)
    .then(res => {  
          //create account object that has sign state and student object
    //We get student data
      this.afs.collection("Instructor").doc(res.user.uid).valueChanges().subscribe(data =>{
        // set student data      
      this.instructor.overloadStudent(res.user.uid,data["name"], data["name"], data["phone"],data["gender"], data["email"]);
      this.setUser();
      })
     // this.router.navigateByUrl("home");
     // console.log( 'Signin success');
    }).catch(error =>{
      alert(error)
    });
  }
  // Register user with email/password
  RegisterUser(name: string, surname: string, gender: string, phone: string, email: string, password: string) {
    //return this.afa.createUserWithEmailAndPassword(email, password);
    return this.afa.createUserWithEmailAndPassword( email, password).then( userCredentials => {
      let id = userCredentials.user.uid;
      this.afs.collection("Instructor").doc(id).set({
        name: name,
        surname: surname,
        gender: gender,
        phone: phone,
        email: email,
      }).then( res => {
       // this.router.navigateByUrl('account');

       // alert("Your account is succesfully created!");
      }).catch( error => {
        alert(error)
      }).catch( error => {
        alert(error)
      })
    }).catch(error => {
      alert(error);
    })
  }
  setUser(){
    let userID = firebase.auth().currentUser.uid.toString();
    if(userID!=null){
    this.afs.collection("Instructor").doc(userID).valueChanges().subscribe(data =>{
      // set student data
      let student = new Instructor(userID, data["name"], data["surname"], data["phone"],data["gender"], data["email"]);
      console.log(student)
      //create account object that has sign state and student object
      let account = new Account(true, student);
      console.log(account);
      //set Account service to keep account object
      this.accountService.setAccount(account);
      })
    }
}
  update_student(recordID, instructor) {
    return this.afs.doc('Instructor/' + recordID).update(instructor).then(res=>{
      //Successfull update
    }).catch(error =>{
      alert(error);
    })
  }
  getEnrolledCourses(userID){
    return this.afs.collection('EnrolledCourse', ref => ref.where('instructor_id','==', userID)).snapshotChanges();
  }
  getInstructorInfo(userID){
    return this.afs.collection('Instructor', ref => ref.where('id','==', userID)).snapshotChanges();
  }
  

  //==========================================================
  
  
  // Sign-out 
   SignOut() {
    return this.afa.signOut().then(() => {  
      this.router.navigate(['account']); 
    })
  }


}
