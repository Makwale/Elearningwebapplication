import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.page.html',
  styleUrls: ['./phone.page.scss'],
})
export class PhonePage implements OnInit {
  confirmationResult: any;

  constructor(private authService: AuthService, private router: Router, private modalController: ModalController) { }

  ngOnInit() {

  }

  sendOTP(phone: string){

		this.authService.signInWithPhone(phone, 'recaptcha-container')
		.then(confirmationResult => {	
      this.confirmationResult = confirmationResult;

    	}).catch(error => {
    		alert(error);
     
    	});
	}

  verifyOTP(otp: string){

		this.authService.confirmOTP(otp, this.confirmationResult).then(userCredentials => {
        this.modalController.dismiss()
  			this.router.navigateByUrl('home')
  
		}).catch(error => {
			alert(error);
		});
	}

  dismiss(){
    this.modalController.dismiss()
  }


}
