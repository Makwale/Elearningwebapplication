import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AccountPage } from '../account/account.page';
import { CoursedetailsPage } from '../coursedetails/coursedetails.page';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slideOpts = {
    init: true,
    initialSlide: 0,
    speed: 1000,
    centeredSlides: true,
    centerInsufficientSlides: true,
    spaceBetween: 2,
    loop: true,
    autoplay:{
      delay: 5000
    }
  };
  slideOpts2 = {
    init: true,
    initialSlide: 0,
    speed: 1500,
    centeredSlides: true,
    centerInsufficientSlides: true,
    spaceBetween: 3,
    loop: true,
    autoplay:{
      delay: 10000
    }

  }
  constructor(private router: Router, private modalCtrl: ModalController) {}
  navigateToCourselink(){
    this.router.navigateByUrl("coursedetails");
  }
  async viewCourse() {
    let modal = await this.modalCtrl.create({
      component: CoursedetailsPage,
      cssClass: 'cart-modal'
    });
    modal.present();
  }
}


