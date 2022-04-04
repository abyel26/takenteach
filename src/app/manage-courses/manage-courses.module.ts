import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageCoursesPageRoutingModule } from './manage-courses-routing.module';

import { ManageCoursesPage } from './manage-courses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageCoursesPageRoutingModule
  ],
  declarations: [ManageCoursesPage]
})
export class ManageCoursesPageModule {}
