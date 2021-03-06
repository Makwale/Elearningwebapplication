import { Component, OnInit } from '@angular/core';
import { QuestionResults } from 'src/app/Model/questionresults.model';
import { Test } from 'src/app/Model/test.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  // exam: Test;

  // questions = [];

  // answer;

  // questionResults: QuestionResults[] = [];

  // totalMartks = 0;

  constructor(private dbs: DatabaseService) { }

  ngOnInit() {
      
  }

  test(){

   
  }

  done(){
    // for(let questionResult of this.questionResults)
    //   if(questionResult.answer == questionResult.yourAnswer){
    //     this.totalMartks++;
    //   }
  }

  submit(question, answer){
    

    // this.questionResults.push(new QuestionResults(question.question, question.answer ,answer ))

  }

  enable(ref){
    ref.disabled = false;
  }

  save(ref){
    ref.disabled = true;
  }

}
