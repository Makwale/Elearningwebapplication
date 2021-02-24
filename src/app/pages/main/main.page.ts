import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

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
