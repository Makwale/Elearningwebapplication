import { Component, OnInit } from '@angular/core';
import * as forum from 'src/assets/js/forum.js'

declare var forum
@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {

  constructor() { }

  ngOnInit() {
    forum()
  }

}
