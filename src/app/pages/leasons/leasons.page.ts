import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-leasons',
  templateUrl: './leasons.page.html',
  styleUrls: ['./leasons.page.scss'],
})
export class LeasonsPage implements OnInit {
selectTabs ="recent";
videoURL;
 lessonList;
  constructor(public activageRoute: ActivatedRoute,public dbs: DatabaseService) { }

  ngOnInit() {
    
    this.activageRoute.queryParams.subscribe(data =>{

       this.lessonList = this.dbs.lessonsList.filter( lesson => lesson.course_id == data["course_id"]);
       console.log(this.lessonList);

    })
  }

  play(videoURL){
    this.videoURL = videoURL;
  }

}