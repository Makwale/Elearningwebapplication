import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddlessonPageRoutingModule } from './addlesson-routing.module';

import { AddlessonPage } from './addlesson.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddlessonPageRoutingModule
  ],
  declarations: [AddlessonPage]
})
export class AddlessonPageModule {}
