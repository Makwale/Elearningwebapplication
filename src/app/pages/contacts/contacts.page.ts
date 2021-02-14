import { Component, OnInit,OnDestroy } from '@angular/core';
import { ModalController, AlertController} from '@ionic/angular';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  constructor( private modalCtrl: ModalController, private alertCtrl: AlertController) { }

  ngOnInit() { }
  async checkout() {
    // Perfom PayPal or Stripe checkout process
 
    let alert = await this.alertCtrl.create({
      header: 'Thank you!',
      message: 'We will be in touch',
      buttons: ['OK']
    });
    alert.present().then(() => {
      this.modalCtrl.dismiss();
    });
  }

  
  }
  
