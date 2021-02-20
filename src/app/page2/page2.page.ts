import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.page.html',
  styleUrls: ['./page2.page.scss'],
})
export class Page2Page implements OnInit {
  a1;
  answer2;
  stat;
  constructor(private route: ActivatedRoute,private router: Router) {
    this.stat=2/3;
    console.log(this.stat);
    
  }

  goNext() {
    this.router.navigateByUrl("page3");
    this.router.navigate(['/page3'], { queryParams: { answer2: this.answer2,a1:this.a1 } });
  
  }

  ngOnInit() {}
}
