import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
 
  selected = 'other';
  type="login";

  submitError: string;
  signInForm: FormGroup;
  signUpForm: FormGroup;

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
      { type: 'required', message: 'phone number is required.' },
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
  constructor(private router: Router, private dbs: DatabaseService) { 
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
        Validators.required
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
  }
  goDash() {
    this.router.navigateByUrl("dashboard");
  
}
  ngOnInit() {
  }
  //==================================== Login ============================================
  signInWithEmail() {
    this.dbs.SignIn(this.signInForm.value['email'], this.signInForm.value['password'])
    .then(user => {
      // successfull login
      console.log(this.signInForm.value['email']);
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
    // successfull sign-up
      console.log(this.signUpForm);
      window.alert('Successful register');
      //Re-Route here
    })
  .catch(error => {
    this.submitError = error.message;
  });
}

}
