import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailcomposerPage } from './emailcomposer.page';

const routes: Routes = [
  {
    path: '',
    component: EmailcomposerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailcomposerPageRoutingModule {}
