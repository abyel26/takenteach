import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UseremailcomposerPage } from './useremailcomposer.page';

const routes: Routes = [
  {
    path: '',
    component: UseremailcomposerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UseremailcomposerPageRoutingModule {}
