import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Student } from '../../Model/student.model';
import { Account } from 'src/app/Model/account.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MatSidenav } from '@angular/material/sidenav';
import { PopoverController } from '@ionic/angular';
import { PopovermainPage } from '../popovermain/popovermain.page';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  loginStatus: boolean = false;

  isStudent: boolean = true;
  userAccount: Account;
  constructor(public accountService: AccountService,
    public loadingCtrl: LoadingController,
    private auth: AngularFireAuth,
    private afs:AngularFirestore, private dbs: DatabaseService,
     private router: Router, public popoverController: PopoverController, public sp: SpinnerService) {

      
    }
  ngOnInit() {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.afs.collection("Student").doc(user.uid).valueChanges().subscribe(data =>{
          // set student data
          let student = new Student(user.uid,data["firstname"], data["lastname"], data["phone"],data["gender"], data["email"]);
          //create account object that has sign state and student object
          this.userAccount = new Account(true, student);
          //set Account service to keep account object
          this.accountService.setAccount(this.userAccount);

          this.dbs.getEnrolledCourses();

          this.dbs.getAnnouncements();
        })
        this.loginStatus = true;
          } else {
        this.loginStatus = false;
      }
    })
  }
 

  navigateToAnnouncement(){
    this.dbs.totalNewAnnouncement = 0;
    this.router.navigateByUrl("studentannouncement")
  }

  async openPopover(ev){
    const popover = await this.popoverController.create({
      component: PopovermainPage,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  
  

}
