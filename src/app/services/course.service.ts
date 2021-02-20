import { Injectable } from '@angular/core';
import { FEATURED_COURSES } from "src/app/mocks/featured.mock";
import { LATEST_COURSES } from '../mocks/latest.mock';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  homeView: boolean;
  featuredCourses: Course [] = FEATURED_COURSES; 
  latestCourses: Course [] = LATEST_COURSES; 
  
  selectedC: Course;
  constructor() {
    //Just for testing home page and latest
    this.selectedC = this.featuredCourses[0];
    this.homeView = false;
   }
  getFeaturedCourses(){
    if(this.homeView){
      return this.featuredCourses = this.featuredCourses.slice(0,3);
    }
    else{
          return this.featuredCourses;
    }
  }
  getLatestCourses(){
    if(this.homeView){
      return this.latestCourses = this.latestCourses.slice(0,3);
    }
    else{
      return this.latestCourses;
    }
  }
  selectCourse(selected:Course)
  {
    this.selectedC = selected;
  }
  
}
