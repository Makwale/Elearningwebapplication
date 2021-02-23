import { Component, OnInit,Input } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.page.html',
  styleUrls: ['./tasklist.page.scss'],
})
export class TasklistPage implements OnInit {

  @Input()
  requiredFileType:string;

  fileName = '';


  constructor(private http: HttpClient) {}

  onFileSelected(event) {

      const file:File = event.target.files[0];

      if (file) {

          this.fileName = file.name;

          const formData = new FormData();

          formData.append("thumbnail", file);

          const upload$ = this.http.post("/api/thumbnail-upload", formData);

          upload$.subscribe();
      }
  }

  ngOnInit() {
  }

}
