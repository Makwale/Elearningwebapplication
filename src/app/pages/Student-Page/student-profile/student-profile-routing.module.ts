import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { StudentProfilePage } from './student-profile.page';

const routes: Routes = [
  {
    path: '',
    component: StudentProfilePage
  }
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentProfilePageRoutingModule {}
