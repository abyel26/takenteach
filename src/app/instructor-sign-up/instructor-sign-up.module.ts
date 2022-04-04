import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chooser, ChooserResult } from '@ionic-native/chooser/ngx';
import { IonicModule } from '@ionic/angular';

import { InstructorSignUpPageRoutingModule } from './instructor-sign-up-routing.module';

import { InstructorSignUpPage } from './instructor-sign-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstructorSignUpPageRoutingModule
  ],
  declarations: [InstructorSignUpPage],
  providers:[
    Chooser
  ]
})
export class InstructorSignUpPageModule {}
