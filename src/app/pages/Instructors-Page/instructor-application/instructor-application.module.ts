import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstructorApplicationPageRoutingModule } from './instructor-application-routing.module';

import { InstructorApplicationPage } from './instructor-application.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstructorApplicationPageRoutingModule
  ],
  declarations: [InstructorApplicationPage]
})
export class InstructorApplicationPageModule {}
