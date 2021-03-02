import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Course } from 'src/app/Model/course';
import { DatabaseService } from 'src/app/services/database.service';
import { ModalController } from '@ionic/angular';
import { AddcoursePage } from '../addcourse/addcourse.page';
import { EditcoursePage } from '../editcourse/editcourse.page';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})


export class CoursesPage implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'actions'];

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
          
  
          this.courses.push(course);
          
          this.getCoursesList();
          
      });

      this.dataSource = new MatTableDataSource(this.courses);
      this.dataSource.sort = this.sort;

    });

    
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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

  async addCourse(){
    const modal = await this.modalController.create({
      component: AddcoursePage,
    });
    await modal.present();
  }

  async editCourse(){
    const modal = await this.modalController.create({
      component: EditcoursePage,
    });
    await modal.present();
  }

  deleteCourse(){

  }


}
