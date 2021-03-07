import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionResults } from 'src/app/Model/questionresults.model';
import { Quiz } from 'src/app/Model/quiz.model';
import { DatabaseService } from 'src/app/services/database.service';
import { QuizserviceService } from 'src/app/services/quizservice.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {

  quiz: Quiz;

  questions = [];

  answer;

  questionResults: QuestionResults[] = [];

  totalMartks = 0;

  constructor(public dbs: DatabaseService, public qs: QuizserviceService, private router: Router) { }

  ngOnInit() {

    this.dbs.getQuiz().subscribe( data =>{
      data.forEach(quizdata => {
        let tempvar = quizdata.payload.doc.data();

        this.quiz = new Quiz(quizdata.payload.doc.id, tempvar["lesson_id"], tempvar["total_marks"], tempvar["duration"], tempvar["questions"])
      })
    })
  }

  
  done(){
   
    this.qs.questionResults = this.questionResults;

    this.qs.quiz = this.quiz;

    this.router.navigateByUrl("quizresults");
    
  }

  save(question, st_answer){
    
    
    this.questionResults.push(new QuestionResults(question.question, question.answer , question.marks ,st_answer ))

  }

}
