import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { InstructorAccount } from 'src/app/Model/Instructor-Model/instructor.account.model';
import { InstructorClass } from 'src/app/Model/Instructor-Model/instructor.model';
import { InstructorAccountService } from './instructor-account.service';
@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private InstructorAccount: InstructorAccount;
  private loggedIn: boolean;
  constructor(private afs: AngularFirestore,
              private afa: AngularFireAuth, 
              private router: Router,
              private accountService: InstructorAccountService
              ) {
    this.InstructorAccount = new InstructorAccount();
    this.loggedIn = this.InstructorAccount.getSignInStatus();  
  }
  public setLoginStatus(_status:boolean){
    this.InstructorAccount.setSignIn(_status);
  }
  public setInstructor(_instructor:InstructorClass){
    this.InstructorAccount.setInstructor(_instructor);
  }
  public getLoginStatus(){
    return this.InstructorAccount.getSignInStatus();
  }
  public getInstructor(){
    return this.InstructorAccount.getInstructor();
  }
  public singIn(email, password) {    
    return this.afa.signInWithEmailAndPassword(email, password)
    .then(res => {
      this.afs.collection("Instructors").doc(res.user.uid).valueChanges().subscribe(data => {
        // set student data      
        this.InstructorAccount.getInstructor().overloadInstructor(
          res.user.uid,
          data["firstname"],
          data["lastname"],
          data["phone"],
          data["gender"],
          data["email"],
          data["biography"],
          data["profession"],
          data["experience"],
          data["detailedExperience"],
          data["status"],
          data["numCourses"],
          data["numStudent"]
        );
        this.accountService.setInstructorAccount(this.InstructorAccount);
        console.log("------Instructor--------");
      })
     // this.router.navigateByUrl("home");
      console.log( '');
    }).catch(error =>{
      alert(error)
    });
  }
 public  RegisterUser(
      name: string,
      surname: string,
      gender: string,
      phone: string, 
      email: string, 
      password: string) {
    //return this.afa.createUserWithEmailAndPassword(email, password);
    return this.afa.createUserWithEmailAndPassword( email, password).then( userCredentials => {
      let id = userCredentials.user.uid;
      this.afs.collection("Instructors").doc(id).set({
        firstname: name,
        lastname: surname,
        gender: gender,
        phone: phone,
        email: email,
        biography: this.InstructorAccount.getInstructor().getBiography(),
        profession: this.InstructorAccount.getInstructor().getProfession(),
        experience: this.InstructorAccount.getInstructor().getExperience(),
        detailedExperience: this.InstructorAccount.getInstructor().getDetailedExperience(),
        status: this.InstructorAccount.getInstructor().getStatus(),
        numCourses : this.InstructorAccount.getInstructor().getNumberOfCourses(),
        numStudents: this.InstructorAccount.getInstructor().getNumberOfStudents()
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
  public instructionCollections(userID:string){
  return  this.afs.collection("Instructors").doc(userID).valueChanges().subscribe(data => {
      // set student data      
      this.InstructorAccount.getInstructor().overloadInstructor(
        data["instructorID"],
        data["firstname"],
        data["lastname"],
        data["phone"],
        data["gender"],
        data["email"],
        data["biography"],
        data["profession"],
        data["experience"],
        data["detailedExperience"],
        data["status"],
        data["numCourses"],
        data["numStudent"]
      );
      this.accountService.setInstructorAccount(this.InstructorAccount);
      console.log("------Instructor--------");
    })  
  }
}
