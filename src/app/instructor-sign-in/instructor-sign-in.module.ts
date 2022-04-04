import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstructorSignInPageRoutingModule } from './instructor-sign-in-routing.module';

import { InstructorSignInPage } from './instructor-sign-in.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstructorSignInPageRoutingModule
  ],
  declarations: [InstructorSignInPage]
})
export class InstructorSignInPageModule {}
