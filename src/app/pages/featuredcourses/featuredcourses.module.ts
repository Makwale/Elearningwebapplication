import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeaturedcoursesPageRoutingModule } from './featuredcourses-routing.module';

import { FeaturedcoursesPage } from './featuredcourses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeaturedcoursesPageRoutingModule
  ],
  declarations: [FeaturedcoursesPage]
})
export class FeaturedcoursesPageModule {}
