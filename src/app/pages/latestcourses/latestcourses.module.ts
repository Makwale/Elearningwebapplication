import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LatestcoursesPageRoutingModule } from './latestcourses-routing.module';

import { LatestcoursesPage } from './latestcourses.page';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LatestcoursesPageRoutingModule,
    MatCardModule,
    MatIconModule,
    MatStepperModule
  ],
  declarations: [LatestcoursesPage]
})
export class LatestcoursesPageModule {}
