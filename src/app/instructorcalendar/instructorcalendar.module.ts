import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstructorcalendarPageRoutingModule } from './instructorcalendar-routing.module';

import { InstructorcalendarPage } from './instructorcalendar.page';
import { NgCalendarModule } from 'ionic2-calendar';
import { CalModalPageModule } from '../pages/cal-modal/cal-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstructorcalendarPageRoutingModule,
    NgCalendarModule,
    CalModalPageModule
  ],
  declarations: [InstructorcalendarPage]
})
export class InstructorcalendarPageModule {}
