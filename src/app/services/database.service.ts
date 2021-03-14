import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore,AngularFirestoreCollection, DocumentChange, DocumentChangeAction } from '@angular/fire/firestore'
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
import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Announcement } from '../Model/announcement.model';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
 
  
  
  // Login user with email/password

  collectionNameStudent = 'Students';

  userAccount: Account;

  private loggedIn: boolean;

  collectionName = 'Course';

  coursesList: Course[] = [];

  lessonsList: Lesson[] = [];

  courses: Course[] = [];

  studentAnnouncement: Announcement[] = [];

  totalNewAnnouncement: number = 0;

  //This variable is used by admin to get studets for selected course on instructor page
  students: Student[] = [];

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

      lessonsdata.forEach( lesson => {

        this.lessonsList.push(new Lesson(lesson.payload.doc.id, 
          lesson.payload.doc.data()["name"], lesson.payload.doc.data()["number"],
          lesson.payload.doc.data()["videoURL"], lesson.payload.doc.data()["docURL"],
          lesson.payload.doc.data()["date"], lesson.payload.doc.data()["course_id"]));
       
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
          imgURL: imgUrl,
          ratings: 0,
          instructor_id: "",
          numberStudentsErrolled: 0
        }).then(() => {
          alert("Course added");
          }).catch( error =>{
            alert(error.message)
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
 
  test() {
    return this.afs.collection("Test").snapshotChanges();
  }

  getAnnouncements(){
    return this.afs.collection("Announcement").snapshotChanges()
  }
  
  post(subject: string ,message: string, category: string) {
    return this.afs.collection("Announcement").add({
      subject: subject,
      date: new Date(),
      message: message,
      category: category
    })
  }

  updateAnnouncement(id: any, message: any) {
    return this.afs.collection("Announcement").doc(id).update({
      message: message,
    })
  }

  getStudentsAnnouncements() {
    this.afs.collection("Announcement", ref => ref.where("category", "==", "s")).snapshotChanges()
    .subscribe(data => {
      data.forEach( studAndata =>{
        let sta = studAndata.payload.doc.data();
        
        let stuAnou = new Announcement(sta["date"],  sta["subject"], sta["message"], sta["category"], true ,studAndata.payload.doc.id);

        if(!this.searchStudentsA(stuAnou))
          this.afs.collection("ViewedAnnouncement", ref => ref.where("category", "==" , "s")).snapshotChanges()
          .subscribe( vdata => {
            if(!this.searchSaveViewedAnnouncement(vdata, stuAnou.id, "36DcJ0XzGmTJTlPjEak7ePuT5X02")){
              stuAnou.viewed = false;
              if(!this.searchStudentsA(stuAnou)){
                this.studentAnnouncement.push( stuAnou);
                this.totalNewAnnouncement++;
              }
            }else{
              if(!this.searchStudentsA(stuAnou)){
                this.studentAnnouncement.push( stuAnou);
              }
            }
            
          })
          
      });
    
    });
  }

  searchStudentsA(ann: Announcement): boolean{
    for(let studA of this.studentAnnouncement){
      if(studA.id == ann.id){
        return true;
      }
    }

    return false;
  }
 

  saveViewedAnnouncementStudent(announcementid: string, studentid: string) {
    this.afs.collection("ViewedAnnouncement", ref => ref.where("student_id", "==", studentid)).snapshotChanges()
    .subscribe( data => {
      if(!this.searchSaveViewedAnnouncement(data, announcementid, studentid)){
        this.afs.collection("ViewedAnnouncement").add({
          announcement_id: announcementid,
          student_id: studentid,
          category: "s"
        })
      }
    })
    
  }

  searchSaveViewedAnnouncement(viewedAnnouncementsdata, announcementid: string, studentid: string) : boolean{

    for(let viewdata of viewedAnnouncementsdata){
      let viewedData = viewdata.payload.doc.data();
      if(viewedData["announcement_id"] == announcementid && viewedData["student_id"] ){
      
        return true;
      }
    }

    return false;
  }

  getQuiz(lesson_id){
    return this.afs.collection("Quiz", ref => ref.where("lesson_id", "==", lesson_id)).snapshotChanges();
  }

  getQuizMarks(student_id) {
    return this.afs.collection("QuizHistroy", ref => ref.where("student_id", "==", student_id)).snapshotChanges();
  }

  saveQuizRestuls(lesson_id, student_id ,date, marks) {
    this.afs.collection("QuizHistroy").add({
      lesson_id : lesson_id,
      student_id: student_id,
      date: date,
      marks: marks
    }).then(() => {
      alert("Quiz results saved");
    })
  }
  

  getStudentsForSelectedCourse(id: string) {
    
    return this.afs.collection("EnrolledCourse", ref => ref.where("course_id", "==", id))
    .snapshotChanges();
  }  

  unassign(course_id) {
    this.afs.collection("Course").doc(course_id).update({
      instructor_id: "",
    })
  }

  getCoursesForSelectedStudent(student_id: string) {
    return this.afs.collection("EnrolledCourse", ref => ref.where("student_id", "==", student_id)).snapshotChanges();
  }
 
 
}
