import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstructorhomePageRoutingModule } from './instructorhome-routing.module';

import { InstructorhomePage } from './instructorhome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstructorhomePageRoutingModule
  ],
  declarations: [InstructorhomePage]
})
export class InstructorhomePageModule {}
