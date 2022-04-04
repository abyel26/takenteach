import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructorUploadVideoPage } from './instructor-upload-video.page';

const routes: Routes = [
  {
    path: '',
    component: InstructorUploadVideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorUploadVideoPageRoutingModule {}
