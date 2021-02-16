import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoursedetailsPageRoutingModule } from './coursedetails-routing.module';

import { CoursedetailsPage } from './coursedetails.page';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoursedetailsPageRoutingModule,
    MatTabsModule,
    MatExpansionModule
  ],
  declarations: [CoursedetailsPage]
})
export class CoursedetailsPageModule {}
