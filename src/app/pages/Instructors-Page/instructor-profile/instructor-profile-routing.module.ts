import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstructorProfilePage } from './instructor-profile.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: InstructorProfilePage
  },
 
];
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorProfilePageRoutingModule {}
