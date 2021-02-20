import { Injectable } from '@angular/core';
import { FEATURED_COURSES } from "src/app/mocks/featured.mock";
import { LATEST_COURSES } from '../mocks/latest.mock';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  homeView: boolean;
  featuredCourses: course [] = FEATURED_COURSES; 
  latestCourses: course [] = LATEST_COURSES; 
  
  selectedC: course;
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
  selectCourse(selected:course)
  {
    this.selectedC = selected;
  }
  
}
