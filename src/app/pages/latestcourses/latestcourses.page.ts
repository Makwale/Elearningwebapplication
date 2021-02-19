import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { CourseService } from 'src/app/services/course.service';
import { CoursedetailsPage } from './../coursedetails/coursedetails.page'
@Component({
  selector: 'app-latestcourses',
  templateUrl: './latestcourses.page.html',
  styleUrls: ['./latestcourses.page.scss'],
})
export class LatestcoursesPage implements OnInit {

  latest_courses : course[] = [];
  selectedCourse: course;
  constructor( 
    private modalCtrl: ModalController,
    private coursesService: CourseService
    ){ }
     ngOnInit() { 
       this.getCourses(); 
       console.log(this.latest_courses);
    }
    //Get all Featured Courses
    getCourses():void{
      this.latest_courses = this.coursesService.getLatestCourses();
    }
    //Selected course
    selectCourse(_course: course){  
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
