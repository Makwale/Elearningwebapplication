import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore'
import { Router } from '@angular/router';
import firebase from 'firebase/app';

import { Account } from '../Model/account.model';
import { Course } from '../Model/course';
import { EnrolledCourse } from '../Model/enrolledcourse.model';
import { Lesson } from '../Model/lesson.mode';
import { Student } from '../Model/student.model';
import { CoursedetailsPage } from '../pages/coursedetails/coursedetails.page';
import { AccountService } from './account.service';
@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  
  private loggedIn: boolean;
  collectionName = 'Course';
  enrolledCoursesList: EnrolledCourse[];
  lessonsList: Lesson[] = [];

  constructor(private afs: AngularFirestore,
     private afa: AngularFireAuth, 
     private router: Router,private accountService: AccountService) {
        this.enrolledCoursesList = [];
    }

  // Login user with email/password
  SignIn(email, password) {    
    return this.afa.signInWithEmailAndPassword(email, password)
    .then(res => {
      this.loggedIn = true;
      //We get student data
      //
      this.afs.collection("Student").doc(res.user.uid).valueChanges().subscribe(data =>{
        // set student data
      
        let student = new Student(res.user.uid,data["firstname"], data["lastname"], data["phone"],data["gender"], data["email"]);

       // console.log(student)
        //create account object that has sign state and student object
        let account = new Account(true, student);
        //set Account service to keep account object
        this.accountService.setAccount(account);

        this.getEnrolledCourses();

      })

     // this.router.navigateByUrl("home");
     //  console.log( 'Signin success');
    }).catch(error =>{
      alert(error)
    });
  }
  // Register user with email/password
  RegisterUser(name: string, surname: string, gender: string, phone: string, email: string, password: string) {
    //return this.afa.createUserWithEmailAndPassword(email, password);
    return this.afa.createUserWithEmailAndPassword( email, password).then( userCredentials => {
      let id = userCredentials.user.uid;
      this.afs.collection("Student").doc(id).set({
        firstname: name,
        lastname: surname,
        gender: gender,
        phone: phone,
        email: email,
      }).then( res => {
        alert("Your account is succesfully created");
      }).catch( error => {
        alert(error)
      }).catch( error => {
        alert(error)
      })
    }).catch(error => {
      alert(error);
    })
  }
  getInstructor(userID){
    return this.afs.collection('Instructor', ref => ref.where('userID','==', userID)).snapshotChanges();
  }

// get enrolled courses from database
  public getEnrolledCourses(){

    if(this.enrolledCoursesList.length > 0){

      this.enrolledCoursesList.slice(0, this.enrolledCoursesList.length - 1)

    }
    
    // A query to select enrolled courses for a specific student
    this.afs.collection("EnrolledCourse", ref => 
    ref.where("student_id", "==", this.accountService.getAccount()

    .getStudent().getStudentNumber())).snapshotChanges().subscribe(enrolledcoursesdata =>{

        
        //Using foreach method on enrolledcoursesdata to loop and get each enrolled course
      enrolledcoursesdata.forEach( course =>{

        //Get lessons for a course by calling getLesson method that accepts course id as parameter

        this.getLessons(course.payload.doc.data()["course_id"]);

        //We used each course id from enrolled courses to get actual course data from Course collection

        this.afs.collection("Course").doc(course.payload.doc.data()["course_id"]
        ).snapshotChanges().subscribe( coursedata =>{

          //Assigning course data to data binding
          let data = coursedata.payload.data();

          //Loading enrolled courses list with Enrolled course object which also takes the actual course data
          this.enrolledCoursesList.push(new EnrolledCourse( new Course(coursedata.payload.id, data["name"], data["ratings"],
          data["imgURL"], data["category"], data["price"], data["instructor_id"])));

         
        })

       

       
      })

    });
  }

// Get lessons for selected enrolled courses
  public getLessons(course_id: string): Lesson[]{

   

    this.afs.collection("Lesson", ref => ref.where("course_id", "==", course_id))

    .snapshotChanges().subscribe( lessonsdata =>{

      if(this.lessonsList.length > 0){
        this.lessonsList.slice(0, this.lessonsList.length - 1);
      }

      lessonsdata.forEach( lesson => {
  
        this.lessonsList.push(lesson.payload.doc.data() as Lesson);
       
      })
      
    })
    return null;
  }

 
}