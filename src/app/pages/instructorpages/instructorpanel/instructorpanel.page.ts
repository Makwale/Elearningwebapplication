import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-instructorpanel',
  templateUrl: './instructorpanel.page.html',
  styleUrls: ['./instructorpanel.page.scss'],
})
export class InstructorpanelPage implements OnInit {

 
  constructor(
    public loadingCtrl: LoadingController,
    private auth: AngularFireAuth,
    private afs:AngularFirestore, private router: Router) {}

    
  ngOnInit() {
  }
  signOut(){
    this.presentLoading();
    if (window.confirm('Do you really want to Sign-Out?')) {    
      this.auth.signOut();
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
