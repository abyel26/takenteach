import { Component, OnInit } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-useremailcomposer',
  templateUrl: './useremailcomposer.page.html',
  styleUrls: ['./useremailcomposer.page.scss'],
})
export class UseremailcomposerPage implements OnInit {

  constructor(public composer: EmailComposer) { }

  ngOnInit() {
  }

  openEmailComposer(){
    this.composer.open({
      to: 'john@doe.com',
      cc: 'jane@doe.com',
      subject: 'Take and Teach Testing',
      body: 'I am currently testing the Take and Teach App!',
      isHtml: true
    })
  }

}
