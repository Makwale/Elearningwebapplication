import { Component, OnInit } from '@angular/core';
import * as quiz from 'src/assets/js/quizDb.js'

declare var quiz
@Component({
  selector: 'app-databasequiz',
  templateUrl: './databasequiz.page.html',
  styleUrls: ['./databasequiz.page.scss'],
})
export class DatabasequizPage implements OnInit {

  constructor() { }

  ngOnInit() {
    quiz()
  }

}
