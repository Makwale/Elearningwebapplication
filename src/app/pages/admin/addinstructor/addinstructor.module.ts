import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddinstructorPageRoutingModule } from './addinstructor-routing.module';

import { AddinstructorPage } from './addinstructor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddinstructorPageRoutingModule
  ],
  declarations: [AddinstructorPage]
})
export class AddinstructorPageModule {}
