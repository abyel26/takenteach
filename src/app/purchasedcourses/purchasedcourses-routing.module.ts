import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchasedcoursesPage } from './purchasedcourses.page';

const routes: Routes = [
  {
    path: '',
    component: PurchasedcoursesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchasedcoursesPageRoutingModule {}
