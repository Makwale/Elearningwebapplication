import { Component, OnInit,OnDestroy } from '@angular/core';
import { ModalController, AlertController} from '@ionic/angular';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit , OnDestroy {

  map: Leaflet.Map;
  
  

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

  ionViewDidEnter() { this.leafletMap(); }

  leafletMap() {


    this.map = Leaflet.map('mapId').setView([-26.270760, 28.112268],10);
    Leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    
    }).addTo(this.map);
 
    var b = new Leaflet.Marker([-26.21197, 28.25958]); 
    var jbrg = new Leaflet.Marker([-26.253811, 27.974689]); 
    var a = new Leaflet.Marker([-26.267222, 28.121944]); 

    b.addTo(this.map);
    jbrg.addTo(this.map);
    a.addTo(this.map);


    
  }
  
   /** Remove map when we have multiple map object */
   ngOnDestroy() {
    this.map.remove();
  }
  
  ionViewWillLeave() {
    this.map.remove();
  }

}
