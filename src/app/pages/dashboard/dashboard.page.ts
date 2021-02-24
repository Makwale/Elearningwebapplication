import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router,
    private auth: AngularFireAuth, ) { }
  goDash() {
    this.router.navigateByUrl("account");
  
}
  ngOnInit() {
  }
  logout(){
    this.auth.signOut();
  }
}

