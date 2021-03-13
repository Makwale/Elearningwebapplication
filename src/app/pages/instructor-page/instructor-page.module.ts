import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstructorPagePageRoutingModule } from './instructor-page-routing.module';

import { InstructorPagePage } from './instructor-page.page';
import { ProfileComponent } from './profile/profile.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstructorPagePageRoutingModule,
    AngularMaterialModule
  ],
  declarations: [InstructorPagePage,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InstructorPagePageModule {}
