import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Course } from 'src/app/Model/course';
import { CourseService } from 'src/app/services/course.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AccountPage } from '../account/account.page';
import { CoursedetailsPage } from '../coursedetails/coursedetails.page';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userAccount:Account;

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
  featured_courses= [];
  latest_courses= [];

  selectedCourse: Course;

  featured_course: Course [] = []; //All courses offered
  latest_course: Course [] = [];
  popular_instructors: Course []=[];
  constructor(private router: Router, 
    private asf:AngularFirestore,
    private modalCtrl: ModalController,
    private courseDao: CourseService) {}
  navigateToCourselink(){
    this.router.navigateByUrl("coursedetails");

  }
  ngOnInit(){
    this.asf.collection<Course>("Course").valueChanges({idField: 'id'}).subscribe(objects =>{
      this.featured_course = objects.splice(9,3);
   })
   this.asf.collection<Course>("Course").valueChanges({idField: 'id'}).subscribe(objects =>{
    this.latest_course = objects.splice(6,3);
 })
 this.asf.collection<Course>("Instructor").valueChanges({idField: 'id'}).subscribe(objects =>{
  this.popular_instructors= objects;
})
 
  }
   //Selected course
   selectCourse(_course:Course){  
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



