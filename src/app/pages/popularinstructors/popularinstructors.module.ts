import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopularinstructorsPageRoutingModule } from './popularinstructors-routing.module';

import { PopularinstructorsPage } from './popularinstructors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopularinstructorsPageRoutingModule
  ],
  declarations: [PopularinstructorsPage]
})
export class PopularinstructorsPageModule {}
