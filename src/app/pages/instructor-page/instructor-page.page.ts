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


}
