import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Instructor } from 'src/app/Model/instructor';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.page.html',
  styleUrls: ['./instructors.page.scss'],
})
export class InstructorsPage implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'surname', 'gender', 'phone', 'email', 'actions'];

  instructors: Instructor[] = [];

  dataSource: MatTableDataSource<Instructor>;

  tempVar: Instructor[] = [];

  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private dbs: DatabaseService, public modalController: ModalController) {
   }

  ngOnInit() {

   this.getAllInstructors();
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteDuplicates(){
    for(let instructor of this.instructors){
      if( this.tempVar.length < 1){
        this.tempVar.push(instructor);
      }else{
        if(!this.search(instructor)){
          this.tempVar.push(instructor);
        }
        
      }
    }

    this.instructors = this.tempVar;
    
    return this.instructors;
  }

  search(instructor: Instructor): boolean{
    for(let tempInstructor of this.tempVar){
      if(tempInstructor.getId() == instructor.getId()) {
        return true;
      }
    }

    return false;
  }

  deleteStudent(studentId){
    this.dbs.deleteStudent(studentId);
    
    this.deleteStudentFromArray(studentId);

    this.getAllInstructors();
    
  }

  getAllInstructors(){
    this.dbs.getAllInstructorsAdmim().subscribe(data =>{
      data.forEach(instructordata => {
        let tempvar = instructordata.payload.doc.data();

        let instructor = new Instructor(instructordata.payload.doc.id, tempvar['name'], tempvar['surname'],
        tempvar['gender'], tempvar['phone'], tempvar['email']);
        

        this.instructors.push(instructor);
        
        this.deleteDuplicates();
        
    });



    this.dataSource = new MatTableDataSource(this.instructors);
   this.dataSource.sort = this.sort;
   this.dataSource.paginator = this.paginator;
    

  });

  }

  deleteStudentFromArray(studentId){
    for(let i = 0; i < this.instructors.length ; i++){
      if(this.instructors[i].getId() == studentId){
        this.instructors.splice(i,1);
      }
    }
  }
}
