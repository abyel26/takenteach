import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstructorUploadVideoPageRoutingModule } from './instructor-upload-video-routing.module';

import { InstructorUploadVideoPage } from './instructor-upload-video.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstructorUploadVideoPageRoutingModule
  ],
  declarations: [InstructorUploadVideoPage]
})
export class InstructorUploadVideoPageModule {}
