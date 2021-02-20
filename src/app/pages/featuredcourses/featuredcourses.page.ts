import { Component, OnInit} from '@angular/core';
import { ModalController} from '@ionic/angular';
import { FeaturedCourse } from 'src/app/MockData/featured.mock';
import { CourseService } from 'src/app/services/course.service';
import { CoursedetailsPage } from './../coursedetails/coursedetails.page';

@Component({
  selector: 'app-featuredcourses',
  templateUrl: './featuredcourses.page.html',
  styleUrls: ['./featuredcourses.page.scss'],
})
export class FeaturedcoursesPage implements OnInit {
  featured_courses = FeaturedCourse;
  selectedCourse;
  constructor( 
    private modalCtrl: ModalController,
    private coursesService: CourseService
    ){ }
     ngOnInit() {
       this.getCourses(); 
       console.log(this.featured_courses);
    }
    //Get all Featured Courses
    getCourses():void{
      this.featured_courses = this.coursesService.getFeaturedCourses();
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
