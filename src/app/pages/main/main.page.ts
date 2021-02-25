import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { DatabaseService } from 'src/app/services/database.service';

import { Account } from 'src/app/Model/account.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  loggedIn:boolean;
  constructor(private dbs:DatabaseService, private auth: AngularFireAuth, 
   private accountService:AccountService) {
   }
  ngOnInit() {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.loggedIn = true;
       } else {
        this.loggedIn = false;
      }
    })
  }
  signout(){
    this.dbs.SignOut();
  }

}
