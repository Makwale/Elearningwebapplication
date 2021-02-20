import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.page.html',
  styleUrls: ['./page1.page.scss'],
})
export class Page1Page implements OnInit  {
  answer1;

  constructor(private router: Router) {}

    goNext(){
      this.router.navigateByUrl("page2")
      this.router.navigate(['/page2'], { queryParams: { answer1: this.answer1 } })
     
    }
    
     
      ngOnInit() {
      }
    }
    
    
    
    
    
    
  