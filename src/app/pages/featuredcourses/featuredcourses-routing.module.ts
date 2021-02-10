import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeaturedcoursesPage } from './featuredcourses.page';

const routes: Routes = [
  {
    path: '',
    component: FeaturedcoursesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturedcoursesPageRoutingModule {}
