import { Component, OnInit } from '@angular/core';
import { QuestionResults } from 'src/app/Model/questionresults.model';
import { QuizserviceService } from 'src/app/services/quizservice.service';

@Component({
  selector: 'app-quizresults',
  templateUrl: './quizresults.page.html',
  styleUrls: ['./quizresults.page.scss'],
})
export class QuizresultsPage implements OnInit {

  questionResults: QuestionResults[] = [];
  date = new Date();
  totalMarks: number = 0;

  constructor(public qs: QuizserviceService) { }

  ngOnInit() {
    this.questionResults = this.qs.questionResults;

     for(let questionResult of this.questionResults){
      if(questionResult.answer == questionResult.student_answer){
        this.totalMarks = this.totalMarks + questionResult.marks;
      }
    }

  }

}
