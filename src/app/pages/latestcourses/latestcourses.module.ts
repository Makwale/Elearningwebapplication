import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LatestcoursesPageRoutingModule } from './latestcourses-routing.module';

import { LatestcoursesPage } from './latestcourses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LatestcoursesPageRoutingModule
  ],
  declarations: [LatestcoursesPage]
})
export class LatestcoursesPageModule {}
