import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructorhomePage } from './instructorhome.page';

const routes: Routes = [
  {
    path: '',
    component: InstructorhomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorhomePageRoutingModule {}
