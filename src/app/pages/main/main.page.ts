import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Student } from '../../Model/student.model';
import { Account } from 'src/app/Model/account.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  loginStatus: boolean = false;
  isStudent:boolean;
  userAccount: Account;
  constructor(public accountService: AccountService,
    public loadingCtrl: LoadingController,
    private auth: AngularFireAuth,
    private afs:AngularFirestore, private dbs: DatabaseService, private router: Router) {
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
        })
        this.loginStatus = true;
          } else {
        this.loginStatus = false;
      }
    })
  }
  signOut(){
    this.presentLoading();
    if (window.confirm('Do you really want to Sign-Out?')) {    
      this.auth.signOut().then(()=>{
        this.userAccount.setSignIn(this.loginStatus);
        this.accountService.setAccount(this.userAccount); //Clear the user     
      })
    }
  }
async presentLoading() {
  const loader = this.loadingCtrl.create({
    message: "signing out....",
    duration: 3000,
  });
  (await loader).present();
}
  navigateToAnnouncement(){
    this.dbs.totalNewAnnouncement = 0;
    this.router.navigateByUrl("studentannouncement")
  }
  


}
