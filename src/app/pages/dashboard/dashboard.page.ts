import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router) { }
  goDash() {
    this.router.navigateByUrl("account");
  
}
  ngOnInit() {
  }
  
}

