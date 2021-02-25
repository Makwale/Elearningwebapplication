import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Account } from 'src/app/Model/account.model';
import { Course } from 'src/app/Model/course';
import { AccountService } from 'src/app/services/account.service';
import { CourseService } from 'src/app/services/course.service';
import { EnrolledCourse } from 'src/app/Model/EnrolledCourse';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.page.html',
  styleUrls: ['./coursedetails.page.scss'],
})
export class CoursedetailsPage implements OnInit {
  
  courseSelected: Course;
  userAccount:Account;
  enrolled_course: EnrolledCourse;

  constructor(private modalCtrl: ModalController,
    private courseDao:CourseService,
    private route:Router,
    private asf:AngularFirestore,
   
    private accountService:AccountService) { 
    }
  ngOnInit() {
    this.courseSelected = this.courseDao.selectedC; 
    this.userAccount = this.accountService.getAccount();
    this.enrolled_course = new EnrolledCourse(this.userAccount.getStudent().getEmail(), this.courseSelected.id);
    }
  close() {
    this.modalCtrl.dismiss();
  }
  enroll(){
      //Check if the user has signed in
      if (this.userAccount.getSignInStatus() != null) {
        let id = this.asf.createId(); 
        this.asf.collection("EnrolledCourse").doc(id).set({
        course_id: this.enrolled_course.getCourseID(),   //From Entity --course_id
        student_id: this.enrolled_course.getStudentID(),       //From Entity --email
      }).then( () => {
        alert(this.courseSelected.name + " enrolled successfully");
        this.close();
        this.route.navigateByUrl('page1');
      }).catch( error => {
        alert(error)
      })
       } else {
        this.close();
        this.route.navigateByUrl('account');
      }
  }
}
