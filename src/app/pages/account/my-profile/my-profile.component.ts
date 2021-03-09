import { Component, OnInit } from '@angular/core';
import  firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { StudentService } from 'src/app/services/Student-Service/student.service';
import { StudentClass } from 'src/app/Model/Student-Model/student';
import { StudentInfo } from 'src/app/Model/Student-Model/student_Info';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {

  color = 'primary';
  mode = 'determinate';
  value = 50;


  user = {} as StudentInfo;
  loggedIn: boolean = false;
  isEdit : boolean = false;
  studentAccount: StudentClass;
  updateUserForm: FormGroup;
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
    }
    ngOnInit() {
      this.updateUserForm.reset();
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

async presentLoading() {
  
  const loader = this.loadingCtrl.create({
    message: "Updating user information....",
  });
  (await loader).present();
}
}
