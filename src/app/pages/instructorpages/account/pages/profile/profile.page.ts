import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileModel } from './profile.model';
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from '../popover/popover.page';
import  firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from '../../services/authentication.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  submitError: string;
  signUpForm: FormGroup;

  nameForm: FormGroup;
  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' },
    ],
    'surname': [
      { type: 'required', message: 'Surname is required.' },
    ],
    'phone': [
      { type: 'required', message: 'phone number is required.'},
      { type: 'minlength', message: 'Phone number must be 10 numbers long.' },
      { type: 'maxlength', message: 'Phone number must not exceed 10 numbers.' },
      
    ],
    'address': [
      { type: 'required', message: 'Address is required.' },
      { type: 'pattern', message: 'Enter a valid address.' }
    ],
    'bio': [
      { type: 'required', message: 'Biography is required.' },
      { type: 'minlength', message: 'Biography must be at least 6 characters long.' }
    ]
  };


  user: ProfileModel;
  userlist: ProfileModel[];
  isEdit:boolean;
  update: boolean;
  editItem: boolean;
  editfield: string;
  constructor(
    private router: Router,
    public popoverController: PopoverController,
    private route: ActivatedRoute,
    private auth:AngularFireAuth,
    private asf: AngularFirestore,
    private authService: AuthenticationService
  ) { 
    this.nameForm = new FormGroup({
      'name': new FormControl('', Validators.compose([
        Validators.required,
        ]))});

    this.signUpForm = new FormGroup({
      'name': new FormControl('', Validators.compose([
        Validators.required,
      ])),
      'surname': new FormControl('', Validators.compose([
        Validators.required,
      ])),
      'phone': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^((\\+27-?)|0)?[0-9]{10}$"),
        Validators.minLength(10),
        Validators.maxLength(10)
      ])),
      'address': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'bio': new FormControl('', Validators.compose([
        Validators.minLength(10),
        Validators.required
      ]))
    });    
    this.editItem = false;
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
    this.asf.collection<ProfileModel>("Instructor", ref => ref.where('id','==', userID)).valueChanges(
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
    this.editItem =true;
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
    this.router.navigateByUrl('sign-in-instructor');
 
  }
}