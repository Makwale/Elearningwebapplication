import { Component, OnInit } from '@angular/core';
import * as htmlQ from 'src/assets/js/htmlQ.js'

declare var htmlQ

@Component({
  selector: 'app-html-quiz',
  templateUrl: './html-quiz.page.html',
  styleUrls: ['./html-quiz.page.scss'],
})
export class HtmlQuizPage implements OnInit {

  constructor() { }

  ngOnInit() {
    htmlQ()
  }

}
