import { Component, OnInit } from '@angular/core';
import  firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { StudentService } from 'src/app/services/Studentn-Service/student.service';
import { StudentClass } from 'src/app/Model/Student-Model/student';
import { StudentInfo } from 'src/app/Model/Student-Model/student_Info';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  user = {} as StudentInfo;
  loggedIn: boolean = false;
  isEdit : boolean = false;
  studentAccount: StudentClass;

  public now: any = (new Date()).toISOString();
  constructor(
    private dbs: StudentService,
    private asf: AngularFirestore) {
      this.studentAccount = new StudentClass();
     }
    ngOnInit() {
      this.setUserAccount();
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

    this.studentAccount.overloadInstructor(
      this.user.studentId,
      this.user.firstname,
      this.user.lastname,
      this.user.phone,
      this.user.gender,
      this.user.email);
  })
}EditRecord(student) {
  console.log(student);
  this.isEdit = true;
  student.firstname = student.geteName();
  student.lastname = student.getSurname();
  student.gender = student.getGender();
  student.phone = student.getPhone();
  student.email = student.getEmail();
}
UpdateRecord(student) {
  if (window.confirm('You are updating your information?')) {    
  let record = {};
  record['firstname'] = student.firstname;
  record['gender'] = student.gender;
  record['lastname'] = student.lastname;
  record['phone'] = student.phone;
  record['email'] = student.email;
  console.log(record);
 // this.accountService.setAccount(this.studentAccount);
  this.dbs.update_student(student.getStudentNumber(), record);  
  this.isEdit = false;
  }
}

}
