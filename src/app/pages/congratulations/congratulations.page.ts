import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-congratulations',
  templateUrl: './congratulations.page.html',
  styleUrls: ['./congratulations.page.scss'],
})
export class CongratulationsPage implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router,
    public alertController: AlertController,

  ) { }

  ngOnInit() {
  }
  showPrompt() {
    this.alertController.create({
      header: 'Why do you want choose this course?',
      inputs: [
        {
          type: 'checkbox',
          label: 'Promotion at work',
          value: 'Promotion at work',
          checked: true,
          disabled: true
        },
        {
          type: 'checkbox',
          label: 'Start a new career',
          value: 'Start a new career'
        },
        {
          type: 'checkbox',
          label: 'Gain a qualification',
          value: 'Gain a qualification'
        },
        {
          type: 'checkbox',
          label: 'Son',
          value: 'son'
        },
        {
          type: 'checkbox',
          label: 'Gain new skills',
          value: 'Gain new skills'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
            console.log('Canceled', data);
          }
        },
        {
          text: 'Done!',
          handler: (data: any) => {
            console.log('/account')
            this.router.navigateByUrl('/account')
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  goNext() {
    this.router.navigateByUrl("Account")
    this.router.navigate(['/Account'])
  }
}
