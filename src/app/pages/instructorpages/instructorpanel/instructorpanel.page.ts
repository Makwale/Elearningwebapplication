import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import  firebase from 'firebase/app';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-instructorpanel',
  templateUrl: './instructorpanel.page.html',
  styleUrls: ['./instructorpanel.page.scss'],
})
export class InstructorpanelPage implements OnInit {

 
  constructor(
    public loadingCtrl: LoadingController,
    private auth: AngularFireAuth,private authService: AuthenticationService,
    private afs:AngularFirestore, private router: Router) {}

    
  ngOnInit() {
  }
  signOut(){
    this.presentLoading();
    if (window.confirm('Do you really want to Sign-Out?')) {  
        firebase.auth().signOut();
        this.auth.signOut();
        this.authService.SignOut();
    
    }
  }
async presentLoading() {
  const loader = this.loadingCtrl.create({
    message: "signing out....",
    duration: 3000,
  });
  (await loader).present();
}
}
