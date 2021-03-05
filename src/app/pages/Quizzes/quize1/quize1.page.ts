import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quize1',
  templateUrl: './quize1.page.html',
  styleUrls: ['./quize1.page.scss'],
})
export class Quize1Page implements OnInit {

  answer1
  answer2
  // answer3
  // answer4
  // answer5
  // answer6
  // answer7
  // answer8
  // answer9
   answer10
 

  timeInSeconds
  time
  runTimer
  hasStarted
  hasFinished
  remainingTime
  displayTime

  
    constructor(private router: Router) {
  
    }
   
    
  
    
  
    ngOnInit() {
      
  
  
  
    this.initTimer();
    this. startTimer();
  
  
  }
  
  initTimer() {
    
   if (!this.timeInSeconds) { 
     this.timeInSeconds = 3600; 
   }
  
   this.time = this.timeInSeconds;
   this.runTimer = false;
   this.hasStarted = false;
   this.hasFinished = false;
   this.remainingTime = this.timeInSeconds;
   
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
   var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
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


  goNext() {
    this.router.navigateByUrl("results")
    this.router.navigate(['/results'], { queryParams: { answer10: this.answer10,answer1: this.answer1,answer2: this.answer2,} });
  }
  
  
  }
 
