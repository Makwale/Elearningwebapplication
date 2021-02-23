import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController} from '@ionic/angular';
import { Course } from 'src/app/Model/course';
import { CourseService } from 'src/app/services/course.service';
import { DatabaseService } from 'src/app/services/database.service';
import { CoursedetailsPage } from './../coursedetails/coursedetails.page'
@Component({
  selector: 'app-latestcourses',
  templateUrl: './latestcourses.page.html',
  styleUrls: ['./latestcourses.page.scss'],
})
export class LatestcoursesPage implements OnInit {
  latest_course: Course [] = [];
  
  selectedCourse;
  iT: string = 'IT';
  bM: string = 'Business Management';
  constructor( 
    private modalCtrl: ModalController, private asf:AngularFirestore,
    private coursesService: CourseService, private dbService: DatabaseService
    ){ }
     ngOnInit() { 
           this.asf.collection<Course>("Course").valueChanges({idField: 'id'}).subscribe(storeItems =>{
        this.latest_course = storeItems;
     })
    }
    
    //Selected course
    selectCourse(_course){  
      this.selectedCourse = _course;
      this.coursesService.selectCourse(this.selectedCourse); //Set the selected course globally to the course service
       this.courseDetails(); //Open Modal course details
    }
    async courseDetails() {
      let modal = await this.modalCtrl.create({
      component: CoursedetailsPage,
      cssClass: 'cart-modal'
    });
    modal.present();
  }
}
