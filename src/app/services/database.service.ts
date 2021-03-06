import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore'
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';

import { Account } from '../Model/account.model';
import { Course } from '../Model/course';
import { EnrolledCourse } from '../Model/enrolledcourse.model';
import { Lesson } from '../Model/lesson.mode';
import { Student } from '../Model/student.model';
import { CoursedetailsPage } from '../pages/coursedetails/coursedetails.page';
import { AccountService } from './account.service';
import { TasklistPage } from '../pages/tasklist/tasklist.page';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  
  

  collectionNameStudent = 'Students';

  userAccount: Account;

  private loggedIn: boolean;

  collectionName = 'Course';

  coursesList: Course[] = [];

  lessonsList: Lesson[] = [];

  courses: Course[] = [];

  constructor(private afs: AngularFirestore,
     private afa: AngularFireAuth, 
     private router: Router,private accountService: AccountService,private storage: AngularFireStorage) {
      // this.setUser();
    }
    setUser(){
      let userID = firebase.auth().currentUser.uid.toString();
      if(userID!=null){
      this.afs.collection("Student").doc(userID).valueChanges().subscribe(data =>{
        // set student data
        let student = new Student(userID, data["firstname"], data["lastname"], data["phone"],data["gender"], data["email"]);
        console.log(student)
        //create account object that has sign state and student object
        let account = new Account(true, student);
        console.log(account);
        //set Account service to keep account object
        this.accountService.setAccount(account);
        })
      }
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
        alert("Your account is succesfully created!");
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

    // A query to select enrolled courses for a specific student
    this.afs.collection("EnrolledCourse", ref => 
    ref.where("student_id", "==", this.accountService.getAccount()

    .getStudent().getStudentNumber())).snapshotChanges().subscribe(enrolledcoursesdata =>{
      let tempvar: Course[] = [];
        
        //Using foreach method on enrolledcoursesdata to loop and get each enrolled course
      enrolledcoursesdata.forEach( enrcourse =>{

        //Get lessons for a course by calling getLesson method that accepts course id as parameter

       this.getLessons(enrcourse.payload.doc.data()["course_id"]);

        //We used each course id from enrolled courses to get actual course data from Course collection

        this.afs.collection("Course").doc(enrcourse.payload.doc.data()["course_id"]
        ).snapshotChanges().subscribe( coursedata =>{

          //Assigning course data to data binding
          let data = coursedata.payload.data();
         

          let course = new Course(coursedata.payload.id, data["name"], data["ratings"],
          data["imgURL"], data["category"], data["price"], data["instructor_id"]);

          
          
          //Loading enrolled courses list with Enrolled course object which also takes the actual course data
          this.coursesList.push(course);
         
          
          
          
        })

       

       
      })

        
        

    });
  }
// Get lessons for selected enrolled courses
  public getLessons(course_id: string): Lesson[]{

   

    this.afs.collection("Lesson", ref => ref.where("course_id", "==", course_id),)

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
  update_student(recordID, student) {
    this.afs.doc('Student/' + recordID).update(student);
    this.setUser();
  }
   // Sign-out 
   SignOut() {
    return this.afa.signOut().then(() => {  
      //this.router.navigate(['']);
      this.userAccount.setSignIn(false);
      this.accountService.setAccount(this.userAccount);
      
    })
  }
  //Method to retrieve all courses for admin
  getCourses(){

    return this.afs.collection("Course").snapshotChanges();

  }


  getAllStudentsAdmim(){

    return this.afs.collection("Student").snapshotChanges();

  }

  getAllInstructorsAdmim(){

    return this.afs.collection("Instructor").snapshotChanges();

  }

  deleteInstructor(id){
    
      this.afs.collection("Instructor").doc(id).delete();
  }
  deleteStudent(studentId){
    this.afs.collection("Student").doc(studentId).delete();
  }
  addCourse(cname , category, price, file) {
    let imgUrl;
    const filePath = cname + String(new Date());
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);

    task.snapshotChanges().pipe( finalize( () => {
  		ref.getDownloadURL().subscribe(url =>{
        imgUrl = url;

        this.afs.collection('Course').add({
          name: cname,
          price: price,
          category: category,
          url: imgUrl,
          ratings: 0,
          instructor_id: "",
          number_students: 0
        }).then(() => {
          alert("Course added");
          })
        });
  	})).subscribe()	
    
  }

  updateCourse(id, cname, category, price){

    this.afs.collection("Course").doc(id).update({
      name: cname,
      price: price,
      category: category,
      ratings: 0,
      instructor_id: "",
      number_students: 0
    }).then(res =>{
      alert("Course updated");
    })
  }

  deleteCourse(id){
    this.afs.collection("Course").doc(id).delete().then(res =>{
      alert("Course deleted");
    })
  }

  addInstructor(name: string, surname: string, gender: string, phone: string, email: string, password: string){
    
    this.afa.createUserWithEmailAndPassword( email, password).then( userCredentials => {
      let id = userCredentials.user.uid;
      this.afs.collection("Instructor").doc(id).set({
        name: name,
        surname: surname,
        gender: gender,
        phone: phone,
        email: email,
      }).then( res => {
        alert("Instructro registered succesfully");
      }).catch( error => {
        alert(error)
      }).catch( error => {
        alert(error)
      })
    }).catch(error => {
      alert(error);
    })
  }

  getInstructorCourses(id: string) {
    return this.afs.collection("Course", ref => ref.where("instructor_id", "==", id)).snapshotChanges();
  }
 
  assignCourse(cid: string, instrid) {
    this.afs.collection("Course").doc(cid).update({
      instructor_id : instrid,
    }).then( res => {
      alert("Course assigned succesfully");
    })
  }

  getEnrolledCourseAdmim(courseid: any) {
    return this.afs.collection("EnrolledCourse", ref => ref.where("course_id", "==", courseid)).snapshotChanges();

  }

  getEnrolledCourseStudentAdmin(student_id: string) {
    return this.afs.collection("Student").doc(student_id).snapshotChanges();
  }
 
 
}
