import { Component, OnInit } from '@angular/core';
import  firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { StudentService } from 'src/app/services/Student-Service/student.service';
import { StudentClass } from 'src/app/Model/Student-Model/student';
import { StudentInfo } from 'src/app/Model/Student-Model/student_Info';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Course } from 'src/app/Model/course';
import { EnrolledCourse } from 'src/app/Model/EnrolledCourse';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
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
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {

 // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  available_course: Course [] = [];
  enrolled_courses: EnrolledCourse[] =[];
  courseDetails: Course[]=[];
  user = {} as StudentInfo;
  loggedIn: boolean = false;
  isEdit : boolean = false;

num:number = 0;
  showEnrolledCourses:boolean;
  showAvailableCourses:boolean;
  studentAccount: StudentClass;
  updateUserForm: FormGroup;
 
  displayedColumns: string[] = ['position','numberStudentsErrolled', 'name', 'category', ];

  courses: Course[] = [];
  coursesDataSource: MatTableDataSource<Course>;
 
  validation_messages = {
    'firstname': [
      { type: 'required', message: 'Name is required.' },
    ],
    'lastname': [
      { type: 'required', message: 'Surname is required.' },
    ],
    'phone': [
      { type: 'required', message: 'phone number is required.'},
      { type: 'minlength', message: 'Phone number must be 10 numbers long.' },
      { type: 'maxlength', message: 'Phone number must not exceed 10 numbers.' }, 
    ],
  };
   constructor(public fb: FormBuilder,
    private dbs: StudentService,
    public loadingCtrl: LoadingController,
    private asf: AngularFirestore) {
      this.studentAccount = new StudentClass();
      this.updateUserForm = new FormGroup({
        'firstname': new FormControl('', Validators.compose([
          Validators.required,
        ])),
        'lastname': new FormControl('', Validators.compose([
          Validators.required,
        ])),
        'phone': new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern("^((\\+27-?)|0)?[0-9]{10}$"),
          Validators.minLength(10),
          Validators.maxLength(10)
        ]))
      }); 
      this.showEnrolledCourses = false;
      this.showAvailableCourses = false;
    }
    ngOnInit() {
      this.getCourses();
      this.getEnrolledCourses();
      this.updateUserForm.reset();
      this.setUserAccount(); 
      
    }

 display(){
  if(this.showEnrolledCourses){
    this.showEnrolledCourses = false;
    this.showAvailableCourses = true;
    console.log(this.showEnrolledCourses," Showing" );
  }
  else{
    this.showEnrolledCourses = true;
    this.showAvailableCourses = false;
    console.log(this.showEnrolledCourses," Showing" );
  }
 }   



setUserAccount(){
   let userID = firebase.auth().currentUser.uid.toString();
   this.asf.collection("Student").doc(userID).valueChanges().subscribe(data =>{   
    // set student data      
    this.user.studentId = userID;
    this.user.firstname = data["firstname"];
    this.user.lastname =  data["lastname"];
    this.user.phone = data["phone"];
    this.user.gender = data["gender"];
    this.user.email =  data["email"];
    this.studentAccount.overloadStudent(
      this.user.studentId,
      this.user.firstname,
      this.user.lastname,
      this.user.phone,
      this.user.gender,
      this.user.email);
  })
}
updateForm() {
  if (window.confirm('You are updating!')){
  this.presentLoading();
  this.dbs.update_student(this.studentAccount.getStudentNumber(), this.updateUserForm.value)
  .then(() => {
    this.loadingCtrl.dismiss();
    this.isEdit = false;
  })
  .catch(error => {
    alert(error);
  });
}
}
keyPress(event: any) {
  const pattern = /[0-9\+\-\ ]/;
  let inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 10 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}
getEnrolledCourses(){  
  let userID = firebase.auth().currentUser.uid.toString();
  this.dbs.getEnrolledCourses(userID).subscribe(data => {
    this.enrolled_courses = data.map(e => {
      return{
        id: e.payload.doc.id,
        ... e.payload.doc.data() as EnrolledCourse
      } as EnrolledCourse
    })
    
  });
}
getCourses(){
  this.asf.collection<Course>("Course").valueChanges({idField: 'id'}).subscribe(storeItems =>{
    this.available_course = storeItems;
    this.coursesDataSource = new MatTableDataSource(this.available_course);

  })
}
async presentLoading() { 
  const loader = this.loadingCtrl.create({
    message: "Updating user information....",
  });
  (await loader).present();
}
}
