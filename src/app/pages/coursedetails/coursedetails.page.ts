import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.page.html',
  styleUrls: ['./coursedetails.page.scss'],
})
export class CoursedetailsPage implements OnInit {
  courseSelected: course;
  constructor(private modalCtrl: ModalController,
    private courseDao:CourseService) { }

  ngOnInit() {
    this.courseSelected = this.courseDao.selectedC;
    console.log(this.courseSelected);
  }
  close() {
    this.modalCtrl.dismiss();
  }
}
