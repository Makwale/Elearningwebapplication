import { Component, OnInit} from '@angular/core';
import { ModalController} from '@ionic/angular';
import { CoursedetailsPage } from './../coursedetails/coursedetails.page';
@Component({
  selector: 'app-featuredcourses',
  templateUrl: './featuredcourses.page.html',
  styleUrls: ['./featuredcourses.page.scss'],
})
export class FeaturedcoursesPage implements OnInit {

  constructor( private modalCtrl: ModalController,) { }

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
