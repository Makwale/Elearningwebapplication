import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/Model/course';
import { EnrolledCourse } from 'src/app/Model/enrolledcourse.model';
import { DatabaseService } from 'src/app/services/database.service';
import { environment } from 'src/environments/environment';
import { CoursedetailsPage } from '../coursedetails/coursedetails.page';

@Component({
  selector: 'app-courseinrolled',
  templateUrl: './courseinrolled.page.html',
  styleUrls: ['./courseinrolled.page.scss'],
})
export class CourseinrolledPage implements OnInit {
  enrolledCourses: Course[] = [];

  listCourses: Course[] = [];
  tempVar: Course[] = [];

  constructor(private Router: Router , private dbs: DatabaseService) { }

  lessons(course_id: string) {
    this.Router.navigate(["leasons"], {queryParams: {"course_id": course_id}}); 
  }
  ngOnInit() {
   this.enrolledCourses = this.dbs.coursesList; 

  }

  getCoursesList(){
    for(let course of this.enrolledCourses){
      if( this.tempVar.length < 1){
        this.tempVar.push(course);
      }else{
        if(!this.search(course)){
          this.tempVar.push(course);
        }
        
      }
    }

    this.enrolledCourses = this.tempVar;

    return this.enrolledCourses;
  }

  search(course: Course): boolean{
    for(let temcourse of this.tempVar){
      if(temcourse.id == course.id){
        return true;
      }
    }

    return false;
  }

 


}
