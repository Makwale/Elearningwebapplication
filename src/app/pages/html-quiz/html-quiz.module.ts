import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HtmlQuizPageRoutingModule } from './html-quiz-routing.module';

import { HtmlQuizPage } from './html-quiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HtmlQuizPageRoutingModule
  ],
  declarations: [HtmlQuizPage]
})
export class HtmlQuizPageModule {}
