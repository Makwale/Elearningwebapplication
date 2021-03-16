import { Component, Input,OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Course } from 'src/app/Model/course';
import { Lesson } from 'src/app/Model/lesson.mode';
import { DatabaseService } from 'src/app/services/database.service';
import { InstructorService } from 'src/app/services/Instructor-Service/instructor.service';

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
  constructor(private storage: AngularFireStorage,
    public db: DatabaseService,
    private afs: AngularFirestore,
     private router: Router,
     private modalCtrl: ModalController,  
      private dbs: InstructorService) { 

      }

  ngOnInit() {
    this.lessonList = [];
    this.lessonList = this.db.lessonsList.filter( lesson => lesson.course_id == this.course.id);
    this.lessonNumber = this.lessonList.length + 1;
  }
  uploadDocURL(event) {
    this.docURL = event.target.files[0];
  }
  uploadVideoUrl(event) {
    this.videoURL = event.target.files[0];
  }


addLesson(lessonName, num){
  if(window.confirm("Add new lesson")){
  this.afs.collection('Lessons').add({
    course_id: this.course.id, 
    name: lessonName,
    date: new Date(),
    number: num,
    //Just for testing purposes....We'll Upload doc and video later
    docUrl: 'https://firebasestorage.googleapis.com/v0/b/elearningapp-ad47e.appspot.com/o/StudyMaterial%2Fnull.pdf?alt=media&token=23fa9391-6edc-48b6-8111-2bd9f09a6624cUrl',
    //StudyMaterial/this.course/name/url
    videoUrl: 'https://firebasestorage.googleapis.com/v0/b/elearningapp-ad47e.appspot.com/o/LessonsVideos%2FHTML%2Fhtml5.mp4?alt=media&token=a3f160c7-1956-4c8d-8103-1e865180cbb9',
    //LessonsVideo/this.course/name/url
  }).then(() => {
    window.alert("lesson added");
    this.close();
    }).catch( error =>{
      window.alert(error.message);
      console.log("Error Message " ,error.message);
    })
      }
  }
  close() {
    this.modalCtrl.dismiss();
  }

}

