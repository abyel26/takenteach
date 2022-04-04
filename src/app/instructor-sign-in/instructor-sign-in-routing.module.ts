import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructorSignInPage } from './instructor-sign-in.page';

const routes: Routes = [
  {
    path: '',
    component: InstructorSignInPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorSignInPageRoutingModule {}
