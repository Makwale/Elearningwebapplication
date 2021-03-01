import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HtmlQuizPage } from './html-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: HtmlQuizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HtmlQuizPageRoutingModule {}
