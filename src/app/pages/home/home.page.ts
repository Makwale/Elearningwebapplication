import { Component } from '@angular/core';

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
  constructor() {}

}
