import { Component, OnInit } from '@angular/core';
import { QuestionResults } from 'src/app/Model/questionresults.model';
import { AccountService } from 'src/app/services/account.service';
import { DatabaseService } from 'src/app/services/database.service';
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

  constructor(public qs: QuizserviceService, private dbs: DatabaseService, private accountService: AccountService) { }

  ngOnInit() {
    this.questionResults = this.qs.questionResults;

     for(let questionResult of this.questionResults){
      if(questionResult.answer == questionResult.student_answer){
        this.totalMarks = this.totalMarks + questionResult.marks;
      }
    }

    this.dbs.saveQuizRestuls(this.qs.quiz.lesson_id, this.accountService.getAccount().getStudent().getStudentNumber() , this.date, this.totalMarks / this.qs.quiz.total_marks * 100);

  }

}
