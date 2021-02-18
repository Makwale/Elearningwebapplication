import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courseinrolled',
  templateUrl: './courseinrolled.page.html',
  styleUrls: ['./courseinrolled.page.scss'],
})
export class CourseinrolledPage implements OnInit {

  constructor(private Router: Router ) { }
  leasons() {
    this.Router.navigateByUrl("leasons")
    
  }

  ngOnInit() {
  }

}
