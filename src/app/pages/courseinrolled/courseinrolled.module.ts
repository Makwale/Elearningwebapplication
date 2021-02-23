import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourseinrolledPageRoutingModule } from './courseinrolled-routing.module';

import { CourseinrolledPage } from './courseinrolled.page';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseinrolledPageRoutingModule,
    MatCardModule
  ],
  declarations: [CourseinrolledPage]
})
export class CourseinrolledPageModule {}
