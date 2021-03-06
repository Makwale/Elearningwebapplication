import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-instructor-application',
  templateUrl: './instructor-application.page.html',
  styleUrls: ['./instructor-application.page.scss'],
})
export class InstructorApplicationPage implements OnInit {
  selectedSegment = 'login';
  loggedIn: boolean;
  addlocation: boolean;
  selected: boolean;
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
      this.selectedSegment = 'address';
      this.addlocation = false;
      this.selected = false;
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