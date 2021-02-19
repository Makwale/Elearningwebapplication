import { Component, OnInit } from '@angular/core';
import { Page1Page } from '../page1/page1.page';
import { Router } from '@angular/router';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage  {

  constructor(private router: Router) {}

  onStart() {
    this.router.navigateByUrl("page1")
  }
}
