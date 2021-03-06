import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.page.html',
  styleUrls: ['./student-profile.page.scss'],
})
export class StudentProfilePage implements OnInit {

  selectedSegment = 'login';
  loggedIn: boolean;
  @ViewChild('cart', {static: false, read: ElementRef}) fab: ElementRef;
  constructor(public popoverController: PopoverController,
    private auth: AngularFireAuth, 
    public router: Router,) {  
      
      this.auth.authState.subscribe(user => {
        if (user) {
          this.loggedIn = true;
          this.selectedSegment = 'myprofile';
         } else {
          this.loggedIn = false;
        }
      })
  }
  ngOnInit() {
    if(this.loggedIn) {
      this.selectedSegment = 'myprofile';
    }
    this.auth.authState.subscribe(user => {
      if (user) {
        this.loggedIn = true;
       } else {
        this.loggedIn = false;
        this.selectedSegment = 'myprofile';
      }
    })
    
  }
  logout(){
    this.auth.signOut();
  }
  segmentChanged($event){
    this.selectedSegment = $event.detail.value;
  }
}