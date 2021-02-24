import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leasons',
  templateUrl: './leasons.page.html',
  styleUrls: ['./leasons.page.scss'],
})
export class LeasonsPage implements OnInit {
selectTabs ="recent";
videoURL;
 
  constructor() { }

  ngOnInit() {
  }

  play(videoURL){
    this.videoURL = videoURL;
  }

}