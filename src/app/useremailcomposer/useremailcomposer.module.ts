import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UseremailcomposerPageRoutingModule } from './useremailcomposer-routing.module';

import { UseremailcomposerPage } from './useremailcomposer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UseremailcomposerPageRoutingModule
  ],
  declarations: [UseremailcomposerPage]
})
export class UseremailcomposerPageModule {}
