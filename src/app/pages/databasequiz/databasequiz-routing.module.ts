import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatabasequizPage } from './databasequiz.page';

const routes: Routes = [
  {
    path: '',
    component: DatabasequizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatabasequizPageRoutingModule {}
