import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructorApplicationPage } from './instructor-application.page';

const routes: Routes = [
  {
    path: '',
    component: InstructorApplicationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorApplicationPageRoutingModule {}
