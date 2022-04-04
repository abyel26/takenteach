import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailcomposerPageRoutingModule } from './emailcomposer-routing.module';

import { EmailcomposerPage } from './emailcomposer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailcomposerPageRoutingModule
  ],
  declarations: [EmailcomposerPage]
})
export class EmailcomposerPageModule {}
