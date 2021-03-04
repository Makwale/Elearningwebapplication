import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular'

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {

  q1
  q2
  q3
  q4
  q5

  q6
  q7
  q8
  q9
  q10

  


  total
  status
  disabled

  neg1
  neg2
  neg3
  neg4
  neg5
  neg6
  neg7
  neg8
  neg9
  neg10
 

  constructor(private route: ActivatedRoute,private router: Router,public navCtrl: NavController) {
    this.total=0
    this.status=""
    this.disabled="false"
    this.neg1=""
    this.neg2=""
    this.neg3=""
    this.neg4=""
    this.neg5=""
    this.neg6=""
    this.neg7=""
    this.neg8=""
    this.neg9=""
    this.neg10=""
    
  }
show(){
    if(this.q1=="desired by consumer"){
      this.total +=1;
      this.neg1="correct";
    }else{
      this.total=this.total;
      this.neg1="wrong";

    }


    if(this.q2=="Sahara"){
      this.total +=1;
      this.neg2="correct";
    }else{
      this.total=this.total;
      this.neg2="wrong";
    }


    if(this.q3=="Nepal"){
      this.total +=1;
      this.neg3="correct";
    }else{
      this.total=this.total;
      this.neg3="wrong";
    }


    if(this.q4=="Trichloromethane"){
      this.total +=1;
      this.neg4="correct";
    }else{
      this.total=this.total;
      this.neg4="wrong";
    }


    if(this.q5=="All of the above"){
      this.total +=1;
      this.neg5="correct";
    } else{
      this.total=this.total;
      this.neg5="wrong";
    }
    if(this.q6=="present continous"){
      this.total +=1;
      this.neg6="correct";
    } else{
      this.total=this.total;
      this.neg6="wrong";
    }
    if(this.q7=="berries"){
      this.total +=1;
      this.neg7="correct";
    } else{
      this.total=this.total;
      this.neg7="wrong";
    }
    if(this.q8=="monkeys"){
      this.total +=1;
      this.neg8="correct";
    } else{
      this.total=this.total;
      this.neg8="wrong";
    }
    if(this.q9=="thieves"){
      this.total +=1;
      this.neg9="correct";
    } else{
      this.total=this.total;
      this.neg9="wrong";
    }
    if(this.q10=="quarters"){
      this.total +=1;
      this.neg10="correct";
    } else{
      this.total=this.total;
      this.neg10="wrong";
    }
   


    if(this.total>7){
      this.status ="pass";
    }else{
      this.status ="fail";
    }

    console.log(this.total)
    this.disabled = true;
  }



  ngOnInit() {
this.route.queryParams.subscribe(params =>{
        console.log(params)
      this.q1 = params.n1
      console.log(this.q1),
      this.q2 = params.m2
      console.log(this.q2)
      this.q3 = params.l3
      console.log(this.q3)
      this.q4 = params.k4
      console.log(this.q4)
      this.q5 = params.j5
      console.log(this.q5)
      this.q6 = params.i6
      console.log(this.q6)
      this.q7 = params.h7
      console.log(this.q7) 
      this.q8 = params.g8
      console.log(this.q8) 
      this.q9 = params.f9
      console.log(this.q9) 
      this.q10 = params.e10
      console.log(this.q10) 
     
  })

  
    
  }

  

   goHome() {
     this.router.navigateByUrl("home")
     this.total=0
   this.status=""
     this.disabled = false;

    this.neg1=""
    this.neg2=""
    this.neg3=""
    this.neg4=""
    this.neg5=""
    this.neg6=""
    this.neg7=""
    this.neg8=""
    this.neg9=""
    this.neg10=""
   

  }



}
