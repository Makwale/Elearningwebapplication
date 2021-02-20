import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private courseDao:CourseService,
    private route:Router) { }

  ngOnInit() {
    this.courseSelected = this.courseDao.selectedC;
  }
  close() {
    this.modalCtrl.dismiss();
  }
  enroll(){
      this.close();
      this.route.navigateByUrl('questions');

  }
}
