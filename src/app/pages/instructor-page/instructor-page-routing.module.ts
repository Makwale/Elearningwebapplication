import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';

import { InstructorPagePage } from './instructor-page.page';
import { ProfileComponent } from './profile/profile.component';
import { AddTutorialComponent } from './Tutorial-Component/add-tutorial/add-tutorial.component';
import { TutorialsListComponent } from './Tutorial-Component/tutorials-list/tutorials-list.component';

const routes: Routes = [
  { path: '',component: InstructorPagePage },
  // { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  { path: 'tutorials', component: TutorialsListComponent },
  { path: 'add', component: AddTutorialComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'view-course', component: CoursesComponent}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorPagePageRoutingModule {}
