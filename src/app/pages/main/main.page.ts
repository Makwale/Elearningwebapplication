import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

import { Account } from 'src/app/Model/account.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  loginStatus: boolean = false;
  constructor(public accoutService: AccountService) {
    this.loginStatus = accoutService.getAccount().getSignInStatus();
   }

  ngOnInit() {
    
  }

  test(){
    alert(this.accoutService.getAccount().getStudent().geteName())
  }

}
