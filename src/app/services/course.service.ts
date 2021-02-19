import { Injectable } from '@angular/core';
import { FEATURED_COURSES } from "src/app/mocks/featured.mock";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  featuredCourses: course [] = FEATURED_COURSES; 

  selectedC: course;
  constructor() {
    //Just for testing home page and latest
    this.selectedC = this.featuredCourses[0];
   }
  getFeaturedCourses(){
    return this.featuredCourses;
  }
  selectCourse(selected:course)
  {
    this.selectedC = selected;
  }
}
