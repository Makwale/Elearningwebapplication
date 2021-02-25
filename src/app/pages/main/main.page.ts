import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

import { Account } from 'src/app/Model/account.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseService } from 'src/app/services/database.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  loginStatus: boolean = false;
  constructor(public accoutService: AccountService,  private auth: AngularFireAuth) {
   }
  ngOnInit() {
   // this.loginStatus = this.accoutService.getAccount().getSignInStatus();
    this.auth.authState.subscribe(user => {
      if (user) {
        this.loginStatus = true;
          } else {
        this.loginStatus = false;
      }
    })
  }
  test(){
    alert(this.accoutService.getAccount().getStudent().geteName())
  }
  signOut(){
    this.auth.signOut();
  }
}
