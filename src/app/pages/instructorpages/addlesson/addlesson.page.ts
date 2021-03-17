import { Component, Input,OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Course } from 'src/app/Model/course';
import { Lesson } from 'src/app/Model/lesson.mode';
import { DatabaseService } from 'src/app/services/database.service';
import { InstructorService } from 'src/app/services/Instructor-Service/instructor.service';
import { AngularMaterialModule } from "../../../angular-material.module";
import { MatProgressBar } from "@angular/material/progress-bar";
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-addlesson',
  templateUrl: './addlesson.page.html',
  styleUrls: ['./addlesson.page.scss'],
})
export class AddlessonPage implements OnInit {

  @Input() course: Course;

  lessonList: Lesson[];
  docURL;
  videoURL;
  lessonNumber: number;


  uploadPercentage;
  filename: string;

  item: Observable<string>;
  price: Observable<number>;
  image: Observable<string>;
  description: Observable<string>
//Document -- pdf
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
//Video -- .mp4
  uploadPercentage_V;
  uploadPercent_V: Observable<number>;
  downloadURL_V: Observable<string>;
  lessonName: Observable<string>;

  constructor(private storage: AngularFireStorage,
    public db: DatabaseService,
    private afs: AngularFirestore,
    private modalCtrl: ModalController,  
    private dbs: InstructorService) { }
    
    onClick(name){
      this.lessonName = name;
      this.dbs.uploadItem(name,this.course.id);
      window.alert(this.lessonName + " lesson Name- " + name + " -lesson Name\n");
     this.close();
  }
    uploadFile(event){
      this.dbs.uploadFile(event, this.course.name,this.lessonName);
      this.uploadPercentage = this.dbs.uploadPercent;
   }
   uploadVideo(event){
    this.dbs.uploadVideo(event,this.course.name,this.lessonName);
    this.uploadPercentage_V = this.dbs.uploadPercent_V;
 }
  ngOnInit() {
    this.lessonList = this.db.lessonsList.filter( lesson => lesson.course_id == this.course.id);
  }
  close() {
    this.modalCtrl.dismiss();
  }

}

