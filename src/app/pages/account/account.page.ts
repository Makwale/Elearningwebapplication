import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Account } from 'src/app/Model/account.model';
import { CourseService } from 'src/app/services/course.service';
import { Student } from 'src/app/Model/student.model';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  hasSignedUp: boolean;
  loggedIn: boolean = false;
  userAccount:Account;
  student: Student;


  selected = 'other';
  type="login";
  submitError: string;
  signInForm: FormGroup;
  signUpForm: FormGroup;
  isEdit : boolean = false;
  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' },
    ],
    'surname': [
      { type: 'required', message: 'Surname is required.' },
    ],
    'gender': [
      { type: 'required', message: 'gender is required.' },
    ],
    'phone': [
      { type: 'required', message: 'phone number is required.'},
      { type: 'minlength', message: 'Phone number must be 10 numbers long.' },
      { type: 'maxlength', message: 'Phone number must not exceed 10 numbers.' },
      
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ]
  };
  constructor(
    private accountService:AccountService, private courseDao: CourseService,private afs:AngularFirestore,
      private router: Router, private dbs: DatabaseService, private auth: AngularFireAuth) { 
    this.signInForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    });
    this.signUpForm = new FormGroup({
      'name': new FormControl('', Validators.compose([
        Validators.required,
      ])),
      'surname': new FormControl('', Validators.compose([
        Validators.required,
      ])),
      'gender': new FormControl('', Validators.compose([
        Validators.required,
      ])),
      'phone': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^((\\+27-?)|0)?[0-9]{10}$"),
        Validators.minLength(10),
        Validators.maxLength(10)
      ])),
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    });  
    this.loggedIn = false;
    this.getUser();
  }
  goDash() {
    this.router.navigateByUrl("dashboard");
  }
  goLogin() {
  this.router.navigateByUrl("dashboard");
}

  ngOnInit() {
    this.getUser();
    this.userAccount =  this.accountService.getAccount();
    console.log(this.userAccount);
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 10 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  //==================================== Login ============================================
  signInWithEmail() {
    this.dbs.SignIn(this.signInForm.value['email'], this.signInForm.value['password'])
    .then(user => {
      // successfull login 
     // this.router.navigateByUrl("");
      this.signInForm.reset();
      window.alert('Successful login');
      //Re-Route here
    })
    .catch(error => {
      this.submitError = error.message;
    });
  }
 //==================================== Signup ============================================
 signUpWithEmail() {
  this.dbs.RegisterUser(
    this.signUpForm.value['name'],
    this.signUpForm.value['surname'],
    this.signUpForm.value['gender'],
    this.signUpForm.value['phone'],
    this.signUpForm.value['email'], 
    this.signUpForm.value['password'])
  .then(user => {
    this.signUpForm.reset();
      window.alert('Successful register');
      //Re-Route here
    })
  .catch(error => {
    this.submitError = error.message;
  });
}
getUser(){
  this.auth.authState.subscribe(user => {
    if (user) {
      this.afs.collection("Student").doc(user.uid).valueChanges().subscribe(data =>{
        // set student data
        this.student = new Student(user.uid,data["firstname"], data["lastname"], data["phone"],data["gender"], data["email"]);
        //create account object that has sign state and student object
        this.userAccount = new Account(true, this.student);
        //set Account service to keep account object
        this.accountService.setAccount(this.userAccount);
      })
      this.loggedIn = true;
        } else {
      this.loggedIn = false;
    }
  })
}
EditRecord(student) {
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
  this.accountService.setAccount(this.userAccount);
  this.dbs.update_student(student.getStudentNumber(), record);  
  this.isEdit = false;
  }
}
logout(){
  this.loggedIn = false;
  this.userAccount.setSignIn(false);
  this.accountService.setAccount(this.userAccount);
  this.auth.signOut();
}

}
