import { Component, OnInit} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ModalController} from '@ionic/angular';
import { Observable } from 'rxjs';
import { FeaturedCourse } from 'src/app/MockData/featured.mock';
import { CourseService } from 'src/app/services/course.service';
import { DatabaseService } from 'src/app/services/database.service';
import { CoursedetailsPage } from './../coursedetails/coursedetails.page';
import { Course } from 'src/app/Model/course';


export interface Courses {      
  id: string;
  name: string;
  ratings: number;
  imgURL:string;
  category:string;
  price: number;
  instructor_id: string; 
}
@Component({
  selector: 'app-featuredcourses',
  templateUrl: './featuredcourses.page.html',
  styleUrls: ['./featuredcourses.page.scss'],
})
export class FeaturedcoursesPage implements OnInit {
 
  selectedCourse; //On select course item

  featured_course: Course [] = []; //All courses offered
  
  constructor( 
    private modalCtrl: ModalController, 
    private asf:AngularFirestore,
    private coursesService: CourseService, 
    private dbService: DatabaseService){}
     
    ngOnInit() {
      this.asf.collection<Course>("Course").valueChanges({idField: 'id'}).subscribe(objects =>{
        this.featured_course = objects;
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
