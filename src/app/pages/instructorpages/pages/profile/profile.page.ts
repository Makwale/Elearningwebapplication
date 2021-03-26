import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileModel } from './profile.model';
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from '../popover/popover.page';
import  firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from '../../services/authentication.service';
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
  constructor(
    private router: Router,
    public popoverController: PopoverController,
    private route: ActivatedRoute,
    private auth:AngularFireAuth,
    private asf: AngularFirestore,
    private authService: AuthenticationService
  ) {    
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
        console.log('Get user',this.userlist);
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