import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructorPagePage } from './instructor-page.page';

const routes: Routes = [
  {
    path: '',
    component: InstructorPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorPagePageRoutingModule {}
