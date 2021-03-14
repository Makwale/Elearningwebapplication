import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Course } from 'src/app/Model/course';
import { DatabaseService } from 'src/app/services/database.service';
import { ModalController } from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { isFormattedError } from '@angular/compiler';



@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})


export class CoursesPage implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'numberStudentsErrolled', 'actions'];

  courses: Course[] = [];

  dataSource: MatTableDataSource<Course>;

  tempVar: Course[] = [];

  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private dbs: DatabaseService, public modalController: ModalController) {
   }

  ngOnInit() {

    this.dbs.getCourses().subscribe(data =>{
      
        data.forEach(coursedata => {
          let tempvar = coursedata.payload.doc.data();
          
        
          let course = new Course(coursedata.payload.doc.id, tempvar["name"], tempvar["ratings"],
          tempvar["imgURL"], tempvar["category"], tempvar["price"], tempvar["instructor_id"]);
          
          course.numberStudentsErrolled = tempvar['numberStudentsErrolled'];
          this.courses.push(course);
          
          this.getCoursesList();
          
      });

      let course = new Course("1", "Java", 3,
      "reter", "IT", 4566, "2434");
      
      course.numberStudentsErrolled = 3;
      this.courses.push(course);

      this.dataSource = new MatTableDataSource(this.courses);
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
      

    });

    
  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  getCoursesList(){
    for(let course of this.courses){
      if( this.tempVar.length < 1){
        this.tempVar.push(course);
      }else{
        if(!this.search(course)){
          this.tempVar.push(course);
        }
        
      }
    }

    this.courses = this.tempVar;

    return this.courses;
  }

  search(course: Course): boolean{
    for(let temcourse of this.tempVar){
      if(temcourse.id == course.id){
        return true;
      }
    }

    return false;
  }


  deleteCourse(id){
    if(confirm("Are you sure, you want to delete?"))
      this.dbs.deleteCourse(id);
  }

  navigateToCourseStudents(course_id, name){
    this.router.navigate(['./adminpanel/coursestudents'], {queryParams: {"course_id": course_id, "name": name}});

  }
  

}