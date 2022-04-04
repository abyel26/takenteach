import { Component, OnInit } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-emailcomposer',
  templateUrl: './emailcomposer.page.html',
  styleUrls: ['./emailcomposer.page.scss'],
})
export class EmailcomposerPage implements OnInit {

  async ngOnInit() {
  }

  constructor(private emailComposer: EmailComposer, public actionSheetController: ActionSheetController) { }

  sendEmail() {
    let email = {
      to: 'john@doe.com',
      cc: 'jane@doe.com',
      subject: 'Take and Teach Testing',
      body: 'I am currently testing the Take and Teach App!',
      isHtml: true
    };
    this.emailComposer.open(email);
  }

}
