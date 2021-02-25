import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/Model/course';
import { EnrolledCourse } from 'src/app/Model/enrolledcourse.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-courseinrolled',
  templateUrl: './courseinrolled.page.html',
  styleUrls: ['./courseinrolled.page.scss'],
})
export class CourseinrolledPage implements OnInit {
  enrolledCourses: EnrolledCourse[] = [];

  listCourses: Course[] = [];

  constructor(private Router: Router , private dbs: DatabaseService) { }

  lessons(course_id: string) {
    this.Router.navigate(["leasons"], {queryParams: {"course_id": course_id}}); 
  }
  ngOnInit() {
    
    this.dbs.enrolledCoursesList.forEach( ercourse => {
      this.listCourses.push(ercourse.getCourse())
    })

    
  }


}
