import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoEditPageRoutingModule } from './video-edit-routing.module';

import { VideoEditPage } from './video-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoEditPageRoutingModule
  ],
  declarations: [VideoEditPage]
})
export class VideoEditPageModule {}
