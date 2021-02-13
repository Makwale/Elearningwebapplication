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
    centeredSlidesBounds: true,
    centeredSlides: true,
    centerInsufficientSlides: true,
    spaceBetween: 3,
    watchSlidesProgress: false,
    loop: true,
    autoplay:{
      delay: 5000
    }
  };
  constructor() {}

}
