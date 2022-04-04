import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersearchPageRoutingModule } from './usersearch-routing.module';

import { UsersearchPage } from './usersearch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersearchPageRoutingModule
  ],
  declarations: [UsersearchPage]
})
export class UsersearchPageModule {}
