import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-page',
  templateUrl: './instructor-page.page.html',
  styleUrls: ['./instructor-page.page.scss'],
})
export class InstructorPagePage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  addTutorial(){
    this.router.navigateByUrl('/add');
  }
  tutolialDetails(){
    this.router.navigateByUrl('/details');
  }
  tutorialsList(){
    this.router.navigateByUrl('/tutorials');
  }
  profile(){
    this.router.navigateByUrl('/profile');
  }
  viewCourse(){
    this.router.navigateByUrl('/view-course');
  }

}
