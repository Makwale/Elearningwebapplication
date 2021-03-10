import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstructorPagePageRoutingModule } from './instructor-page-routing.module';

import { InstructorPagePage } from './instructor-page.page';
import { ProfileComponent } from './profile/profile.component';
import { CoursesComponent } from './courses/courses.component';
import { TutorialDetailsComponent } from './Tutorial-Component/tutorial-details/tutorial-details.component';
import { TutorialsListComponent } from './Tutorial-Component/tutorials-list/tutorials-list.component';
import { AddTutorialComponent } from './Tutorial-Component/add-tutorial/add-tutorial.component';
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
    ProfileComponent, CoursesComponent,
    TutorialDetailsComponent,
    TutorialsListComponent,
    AddTutorialComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InstructorPagePageModule {}
