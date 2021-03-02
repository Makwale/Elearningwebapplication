import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructorInstructorsPage } from './instructor-instructors.page';

const routes: Routes = [
  {
    path: '',
    component: InstructorInstructorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorInstructorsPageRoutingModule {}
