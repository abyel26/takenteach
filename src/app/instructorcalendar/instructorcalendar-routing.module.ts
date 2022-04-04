import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructorcalendarPage } from './instructorcalendar.page';

const routes: Routes = [
  {
    path: '',
    component: InstructorcalendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorcalendarPageRoutingModule {}
