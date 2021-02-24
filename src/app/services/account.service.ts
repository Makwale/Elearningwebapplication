import { Injectable } from '@angular/core';
import { Account } from '../Model/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  
  private account: Account;

  constructor() {
   }

   public setAccount(account: Account){
     this.account = account;
   }

  public getAccount(){
    return this.account;
  }
}
