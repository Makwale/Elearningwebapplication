import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FeaturedcoursesPageRoutingModule } from './featuredcourses-routing.module';

import { FeaturedcoursesPage } from './featuredcourses.page';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeaturedcoursesPageRoutingModule,
    MatCardModule,
    MatIconModule,
    MatStepperModule

  ],
  declarations: [FeaturedcoursesPage]
})
export class FeaturedcoursesPageModule {}
