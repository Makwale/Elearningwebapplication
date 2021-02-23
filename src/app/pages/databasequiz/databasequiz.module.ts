import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatabasequizPageRoutingModule } from './databasequiz-routing.module';

import { DatabasequizPage } from './databasequiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatabasequizPageRoutingModule
  ],
  declarations: [DatabasequizPage]
})
export class DatabasequizPageModule {}
