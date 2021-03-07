import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstructorPagePageRoutingModule } from './instructor-page-routing.module';

import { InstructorPagePage } from './instructor-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstructorPagePageRoutingModule
  ],
  declarations: [InstructorPagePage]
})
export class InstructorPagePageModule {}
