import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstructorInstructorsPageRoutingModule } from './instructor-instructors-routing.module';

import { InstructorInstructorsPage } from './instructor-instructors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstructorInstructorsPageRoutingModule
  ],
  declarations: [InstructorInstructorsPage]
})
export class InstructorInstructorsPageModule {}
