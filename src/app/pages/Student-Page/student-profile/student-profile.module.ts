import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentProfilePageRoutingModule } from './student-profile-routing.module';

import { StudentProfilePage } from './student-profile.page';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    StudentProfilePageRoutingModule
  ],
  declarations: [StudentProfilePage,MyProfileComponent,LoginComponent,SignupComponent]
})
export class StudentProfilePageModule {}
