import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { CoursedetailsPage} from './../coursedetails/coursedetails.page'
@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  async viewCourse() {
    let modal = await this.modalCtrl.create({
      component: CoursedetailsPage,
      cssClass: 'cart-modal'
    });
    modal.present();
  }
}