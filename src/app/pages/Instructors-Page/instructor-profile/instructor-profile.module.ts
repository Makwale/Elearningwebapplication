import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstructorProfilePageRoutingModule } from './instructor-profile-routing.module';

import { InstructorProfilePage } from './instructor-profile.page';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InstructorProfilePageRoutingModule
  ],
  declarations: [InstructorProfilePage, MyProfileComponent,LoginComponent,SignupComponent]
})
export class InstructorProfilePageModule {}
