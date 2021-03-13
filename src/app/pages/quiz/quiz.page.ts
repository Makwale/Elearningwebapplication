import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  [x: string]: any;


  timeInSeconds
  time
  runTimer
  hasStarted
  hasFinished
  remainingTime
  displayTime





  quiz: Quiz;

  questions = [];

  answer;

  questionResults: QuestionResults[] = [];

  totalMartks = 0;

  date =new Date();

  isStarted = false;

  duration;


  constructor(public dbs: DatabaseService, public qs: QuizserviceService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(data => {

      this.dbs.getQuiz(data["lesson_id"]).subscribe( data =>{
        data.forEach(quizdata => {
          let tempvar = quizdata.payload.doc.data();

          this.quiz = new Quiz(quizdata.payload.doc.id, tempvar["lesson_id"], tempvar["total_marks"], tempvar["duration"], tempvar["questions"])

         
          this.timeInSeconds = this.quiz.duration * 60;
        })
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

  start(){
    this.isStarted = true;

    // setInterval(() => {
    //   this.duration.setMinutes(0,this.duration.getMinutes() - 1);
    //   //alert("Hello world");
    // },1000)

    this.initTimer();
    this.startTimer();
    this.timeOut();

  }

  initTimer() {

  //  if (!this.timeInSeconds) {
  //    this.timeInSeconds = 1800;
  //  }

   this.time = this.timeInSeconds;
   this.runTimer = false;
   this.hasStarted = false;
   this.hasFinished = false;
   this.remainingTime = this.quiz.duration * 60;

   this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
  }

  startTimer() {
    this.runTimer = true;
   this.hasStarted = true;
   this.timerTick();
  }

  pauseTimer() {
   this.runTimer = false;
  }


timeOut(){
  if(this.displayTime <= 1 ){
    window.alert('We are done');
    this.done();
  }
}

  resumeTimer() {
   this.startTimer();
  }

  timerTick() {
   setTimeout(() => {

     if (!this.runTimer) { return; }
     this.remainingTime--;
     this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
     if (this.remainingTime > 0) {
       this.timerTick();
     }
     else {
       this.hasFinished = true;
     }
   }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
   var sec_num = parseInt(String(inputSeconds), 10);
   var hours = Math.floor(sec_num / 3600);
   var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
   var seconds = sec_num - (hours * 3600) - (minutes * 60);
   var hoursString = '';
   var minutesString = '';
   var secondsString = '';
   hoursString = (hours < 10) ? "0" + hours : hours.toString();
   minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
   secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
   return hoursString + ':' + minutesString + ':' + secondsString;
  }


}
