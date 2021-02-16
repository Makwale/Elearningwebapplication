import { Component, OnInit } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
 
  type="login"
  constructor(private router: Router) { }

  ngOnInit() {
  }

}
