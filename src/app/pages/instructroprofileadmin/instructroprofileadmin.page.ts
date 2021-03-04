import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Course } from 'src/app/Model/course';
import { Student } from 'src/app/Model/student.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-instructroprofileadmin',
  templateUrl: './instructroprofileadmin.page.html',
  styleUrls: ['./instructroprofileadmin.page.scss'],
})
export class InstructroprofileadminPage implements OnInit {
  
  displayedColumns: string[] = ['id', 'name', 'category', 'numberStudentsErrolled'];

  
  courses: Course[] = [];

  dataSource: MatTableDataSource<Course>;

  tempVar: Course[] = [];

  displayedColumns2: string[] = ['studentId', 'firstname', 'lastname', 'gender', 'phone', 'email'];

  students: Student[] = [];

  dataSource2: MatTableDataSource<Student>;

  tempVar2: Student[] = [];


  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private dbs: DatabaseService, public modalController: ModalController) {
   }

  ngOnInit() {
    this.getCourses();
    this.getAllStudents()
  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  getCourses(){
    this.dbs.getCourses().subscribe(data =>{
      data.forEach(coursedata => {
        let tempvar = coursedata.payload.doc.data();

        let course = new Course(coursedata.payload.doc.id, tempvar["name"], tempvar["ratings"],
        tempvar["imgURL"], tempvar["category"], tempvar["instructor_id"], tempvar['numberStudentsErrolled']);
        

        this.courses.push(course);
        
        this.getCoursesList();
        
    });

   this.dataSource = new MatTableDataSource(this.courses);
   this.dataSource.sort = this.sort;
   this.dataSource.paginator = this.paginator;
    

  });

}

getAllStudents(){
  this.dbs.getAllStudentsAdmim().subscribe(data =>{
    data.forEach(studentdata => {
      let tempvar = studentdata.payload.doc.data();

      let student = new Student(studentdata.payload.doc.id, tempvar['firstname'], tempvar['lastname'],
      tempvar['gender'], tempvar['phone'], tempvar['email']);
      

      this.students.push(student);
      
      // this.deleteDuplicates();
      
  });



  this.dataSource2 = new MatTableDataSource(this.students);
  this.dataSource2.sort = this.sort;
  this.dataSource2.paginator = this.paginator;
  

});

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
      component: null,
    });
    await modal.present();
  }


}
