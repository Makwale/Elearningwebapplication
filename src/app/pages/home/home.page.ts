import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
<<<<<<< HEAD
import { AccountPage } from '../account/account.page';
=======
import { CourseService } from 'src/app/services/course.service';
>>>>>>> 5b417b343cb6db32ce563dfd8aaeb8e082618912
import { CoursedetailsPage } from '../coursedetails/coursedetails.page';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  slideOpts = {
    init: true,
    initialSlide: 0,
    speed: 1000,
    centeredSlides: true,
    centerInsufficientSlides: true,
    spaceBetween: 2,
    loop: true,
    autoplay:{
      delay: 5000
    }
  };
  slideOpts2 = {
    init: true,
    initialSlide: 0,
    speed: 1500,
    centeredSlides: true,
    centerInsufficientSlides: true,
    spaceBetween: 3,
    loop: true,
    autoplay:{
      delay: 10000
    }

  }
  featured_courses : course[] = [];
  latest_courses : course[] = [];
  selectedCourse: course;
  constructor(private router: Router, 
    private modalCtrl: ModalController,
    private courseDao: CourseService) {}
  navigateToCourselink(){
    this.router.navigateByUrl("coursedetails");
  }
  ngOnInit(){
      this.featured_courses = this.courseDao.getFeaturedCourses().slice(0,3);
      this.latest_courses = this.courseDao.getLatestCourses().slice(0,3);  
  }
   //Selected course
   selectCourse(_course: course){  
    this.selectedCourse = _course;
    this.courseDao.selectCourse(this.selectedCourse); //Set the selected course globally to the course service
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


