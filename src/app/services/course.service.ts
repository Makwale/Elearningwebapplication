import { Injectable } from '@angular/core';
import { FEATURED_COURSES } from "src/app/mocks/featured.mock";
import { LATEST_COURSES } from '../mocks/latest.mock';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  featuredCourses: course [] = FEATURED_COURSES; 
  latestCourses: course [] = LATEST_COURSES; 
  selectedC: course;
  constructor() {
    //Just for testing home page and latest
    this.selectedC = this.featuredCourses[0];
   }
  getFeaturedCourses(){
    return this.featuredCourses;
  }
  getLatestCourses(){
    return this.latestCourses;
  }
  selectCourse(selected:course)
  {
    this.selectedC = selected;
  }
}
