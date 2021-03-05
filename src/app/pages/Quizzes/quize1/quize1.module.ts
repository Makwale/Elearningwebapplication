import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Quize1PageRoutingModule } from './quize1-routing.module';

import { Quize1Page } from './quize1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Quize1PageRoutingModule
  ],
  declarations: [Quize1Page]
})
export class Quize1PageModule {}
