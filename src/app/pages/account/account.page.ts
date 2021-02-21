import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ModalController } from '@ionic/angular';
import { PhonePage } from '../phone/phone.page';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
 
  type="login"
  constructor(private router: Router, private dbs: DatabaseService, private authService: AuthService,private modalController: ModalController) { }

  ngOnInit() {
  }

  createUserAccount(name: string, surname: string, gender: string, phone: string, email: string, password: string, cpassword: string){
      this.dbs.createUserAccount( name, surname, gender, phone, email, password);
  }

  signInWithEmailAndPassword(email: string, password: string){
    this.dbs.signinWithEmailAndPassword(email, password);
  }

  signInWithFacebook(){
		this.authService.logingWithFacebook().then( userCredentials =>{
      this.router.navigateByUrl("home");
    });
	}

  async signInWithPhone(){
    const modal = await this.modalController.create({
      component: PhonePage
    });
    await modal.present();
  }

}
