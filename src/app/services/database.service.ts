import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private asf: AngularFirestore,
     private afa: AngularFireAuth, 
     private router: Router) { }
  //The method to create student account
  // createUserAccount(name: string, surname: string, gender: string, phone: string, email: string, password: string){
  //   this.afa.createUserWithEmailAndPassword( email, password).then( userCredentials => {
  //     let id = userCredentials.user.uid;
  //     this.asf.collection("Student").doc(id).set({
  //       firstname: name,
  //       lastname: surname,
  //       gender: gender,
  //       phone: phone,
  //       email: email,

  //     }).then( res => {
  //       alert("Your account is succesfully created");
  //     }).catch( error => {
  //       alert(error)
  //     }).catch( error => {
  //       alert(error)
  //     })
  //   }).catch(error => {
  //     alert(error);
  //   })
  // }
  // signinWithEmailAndPassword(email: string, password: string){
  //     this.afa.signInWithEmailAndPassword(email, password).then( res => {
  //       this.router.navigateByUrl("home");
  //     }).catch(error =>{
  //       alert(error)
  //     });
  // }



  // Login user with email/password
 
 
  SignIn(email, password) {    
    return this.afa.signInWithEmailAndPassword(email, password)
    .then(res => {
      this.router.navigateByUrl("home");
       console.log( 'Signin success');
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
}
