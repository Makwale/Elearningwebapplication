import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-page3',
  templateUrl: './page3.page.html',
  styleUrls: ['./page3.page.scss'],
})
export class Page3Page implements OnInit {
  b1
  a2
  answer3
  stat
  
  

  
  constructor(private route: ActivatedRoute,private router: Router) {
    this.stat=3/3
    console.log(this.stat)
    
  }

  goNext() {
    this.router.navigateByUrl("congratulations")
    this.router.navigate(['/pages/congratulations'], { queryParams: { answer3: this.answer3,b1:this.b1,a2:this.a2 } });
    
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params =>{
      console.log(params)
    this.b1 = params.a1
    console.log(this.b1),
    this.a2 = params.answer2
    console.log(this.a2)

  })

  }
}