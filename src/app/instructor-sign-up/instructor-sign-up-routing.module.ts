import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructorSignUpPage } from './instructor-sign-up.page';

const routes: Routes = [
  {
    path: '',
    component: InstructorSignUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorSignUpPageRoutingModule {}
