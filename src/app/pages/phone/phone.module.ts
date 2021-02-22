import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhonePageRoutingModule } from './phone-routing.module';
import {MatButtonModule} from '@angular/material/button';

import { PhonePage } from './phone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhonePageRoutingModule,
    MatButtonModule
  ],
  declarations: [PhonePage]
})
export class PhonePageModule {}
