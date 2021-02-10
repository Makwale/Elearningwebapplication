import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopularcoursesPageRoutingModule } from './popularcourses-routing.module';

import { PopularcoursesPage } from './popularcourses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopularcoursesPageRoutingModule
  ],
  declarations: [PopularcoursesPage]
})
export class PopularcoursesPageModule {}
