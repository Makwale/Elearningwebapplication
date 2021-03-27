import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileModel } from './profile.model';
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from '../popover/popover.page';
import  firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from '../../services/authentication.service';

import { Student } from 'src/app/Model/student.model';
import { Account } from 'src/app/Model/Instructor-Model/account.model';
import { Instructor } from 'src/app/Model/instructor';
import { StudentClass } from 'src/app/Model/Student-Model/student';
import { StudentInfo } from 'src/app/Model/Student-Model/student_Info';
import { AccountService } from 'src/app/services/Instructor-Service/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: ProfileModel;
  userlist: ProfileModel[];
  isEdit:boolean;
  update: boolean;
  editfield: string;

  
  userAccount: Account;
  student: Instructor;
  studentAccount: StudentClass;
  useri = {} as StudentInfo;



  constructor(

    private router: Router,
    public popoverController: PopoverController,
    private route: ActivatedRoute,
    private accountService: AccountService,

    private auth:AngularFireAuth,
    private asf: AngularFirestore,
    private authService: AuthenticationService
  ) {    
    this.studentAccount = new StudentClass();
    this.userAccount =  this.accountService.getAccount();   
    this.getUser();
    this.isEdit =false;
    this.update = false;
    this.editfield ="";
  }
  ngOnInit() {
this.auth.authState.subscribe(user => {
  if (user) {
    this.getUserInfo();  
  } else {
  }
  })
  }
  getUserInfo(){
    let userID = firebase.auth().currentUser.uid.toString();
    this.asf.collection<ProfileModel>("InstructorAccount", ref => ref.where('id','==', userID)).valueChanges(
      { idField: 'id'}).subscribe(user =>{
        this.userlist = user;
        this.user = this.userlist[0];
        this.studentAccount.overloadStudent(this.user.id,this.user.firstname,this.user.lastname,this.user.phone,this.user.gender,this.user.email);   
        console.log('Get data one by on',this.user.firstname,this.user.lastname);
        console.log('Get student account',this.studentAccount);
      })
  }
//   setUserAccount(){
//     let userID = firebase.auth().currentUser.uid.toString();
//     this.asf.collection("Instructor").doc(userID).valueChanges().subscribe(data =>{   
//      // set student data      
//      this.user.id = userID;
//      this.user.firstname = data["name"];
//      this.user.lastname =  data["surname"];
//      this.user.phone = data["phone"];
//      this.user.gender = data["gender"];
//      this.user.email =  data["email"];
//      this.studentAccount.overloadStudent(
//        this.user.id,
//        this.user.firstname,
//        this.user.lastname,
//        this.user.phone,
//        this.user.gender,
//        this.user.email);
//    })
//  }
 getUser(){
  this.auth.authState.subscribe(user => {
    if (user) {
      this.asf.collection("Instructor").doc(user.uid).valueChanges().subscribe(data =>{
        // set student data
        let student = new Instructor(user.uid,data["firstname"], data["lastname"], data["phone"],data["gender"], data["email"]);
        //create account object that has sign state and student object
        let userAccount = new Account(true, student);
        //set Account service to keep account object
        this.accountService.setAccount(userAccount);
      })
    } 
  })
}
  updateProfile() {
    let userID = firebase.auth().currentUser.uid.toString();
    this.authService.updateInfo(userID,this.user);
  }
  updateState(field){
    this.update = true;
    this.editfield = field;
  }
  cancelUpdate(){
    this.editfield = "noEdit"; 
    this.getUserInfo(); 
    this.update = false;
  }
  updatedState(){
    this.editfield = "noEdit";  
    this.update = false;
    this.updateProfile();
  }
  async uploadPhoto(ev){
    const popover = await this.popoverController.create({
      component: PopoverPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  goHome(){
    this.router.navigateByUrl('instructorpanel');
  }
  signOut() {
    this.userlist = [];
    this.user = this.userlist[0];
    firebase.auth().signOut();
    this.auth.signOut();
    this.authService.SignOut();
  }
}