import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { TasklistPageRoutingModule } from './tasklist-routing.module';

import { TasklistPage } from './tasklist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    TasklistPageRoutingModule
  ],
  declarations: [TasklistPage]
})
export class TasklistPageModule {}
