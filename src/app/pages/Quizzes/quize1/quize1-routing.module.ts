import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Quize1Page } from './quize1.page';

const routes: Routes = [
  {
    path: '',
    component: Quize1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Quize1PageRoutingModule {}
