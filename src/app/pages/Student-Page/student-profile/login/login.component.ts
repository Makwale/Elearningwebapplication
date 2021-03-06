import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from "@angular/forms";
import { LoadingController } from '@ionic/angular';
import { StudentService } from 'src/app/services/Studentn-Service/student.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  userAccount: Account;
  
  public loginInvalid: boolean;
  signInForm: FormGroup;
  submitError: string;

  validation_messages = {
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
    private studentDao:StudentService,
    private fb: FormBuilder,
    public loadingCtrl: LoadingController,) {
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
     }
     ngOnInit() {
      this.form = this.fb.group({
        username: ['', Validators.email],
        password: ['', Validators.required]
      });
  }   
  signInWithEmail() {
    this.studentDao.SignIn(this.signInForm.value['email'], this.signInForm.value['password'])
    .then(user => {
      this.signInForm.reset();
      window.alert('Successful login' + user);
      console.log(user,"My user Account");
    })
    .catch(error => {
      this.submitError = error.message;
    });
  }
  async presentLoading() {
    const loader = this.loadingCtrl.create({
      message: "Signing in....",
      duration: 5000
    });
    (await loader).present();
    
  }
  }
 


