import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsergalleryPageRoutingModule } from './usergallery-routing.module';

import { UsergalleryPage } from './usergallery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsergalleryPageRoutingModule
  ],
  declarations: [UsergalleryPage]
})
export class UsergalleryPageModule {}
