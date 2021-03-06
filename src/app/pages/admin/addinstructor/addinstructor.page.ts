import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-addinstructor',
  templateUrl: './addinstructor.page.html',
  styleUrls: ['./addinstructor.page.scss'],
})
export class AddinstructorPage implements OnInit {

  constructor(private router: Router, private dbs: DatabaseService) { }

  ngOnInit() {
  }

  addInstructor(name, surname, gender, phone, email, password){
    this.dbs.addInstructor(name, surname, gender, phone, email, password);
  }

}
