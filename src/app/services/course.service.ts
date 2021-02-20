import { Injectable } from '@angular/core';
import { FeaturedCourse } from 'src/app/MockData/featured.mock';
import { LatestCourse } from 'src/app/MockData/latest.mock';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  homeView: boolean;
  featuredCourses = FeaturedCourse; 
  latestCourses = LatestCourse; 
  selectedC;
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
  selectCourse(selected)
  {
    this.selectedC = selected;
  }
  
}
