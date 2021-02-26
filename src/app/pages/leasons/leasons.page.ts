import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from 'src/app/Model/lesson.mode';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-leasons',
  templateUrl: './leasons.page.html',
  styleUrls: ['./leasons.page.scss'],
})
export class LeasonsPage implements OnInit {
selectTabs ="recent";
videoURL;
 lessonList: Lesson[];
  constructor(public activageRoute: ActivatedRoute,public dbs: DatabaseService) { }

  ngOnInit() {
    
    this.activageRoute.queryParams.subscribe(data =>{
      this.lessonList = [];
       this.lessonList = this.dbs.lessonsList.filter( lesson => lesson.course_id == data["course_id"]);
       //console.log(data["course_id"]);
       this.sort();
      
    })
  }

  play(videoURL){
    this.videoURL = videoURL;
  }

  sort(){
    let tempvar: Lesson;
    for(let i = 0; i < this.lessonList.length; i++){
      
      for(let k = 0 ; k < this.lessonList.length; k++){
        if(this.lessonList[i].number < this.lessonList[k].number){
          tempvar = this.lessonList[k];
          this.lessonList[k] = this.lessonList[i];
          this.lessonList[i] = tempvar;
        }
      }
    }
  }

}