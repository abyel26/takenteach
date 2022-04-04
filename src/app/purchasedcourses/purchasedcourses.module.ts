import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchasedcoursesPageRoutingModule } from './purchasedcourses-routing.module';

import { PurchasedcoursesPage } from './purchasedcourses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchasedcoursesPageRoutingModule
  ],
  declarations: [PurchasedcoursesPage]
})
export class PurchasedcoursesPageModule {}
