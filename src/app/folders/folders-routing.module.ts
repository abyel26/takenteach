import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoldersPage } from './folders.page';

const routes: Routes = [
  {
    path: '',
    component: FoldersPage
  }
  // {
  //   path: 'folders/:folder', loadChildren: () => import('./folders.module').then( m => m.FoldersPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoldersPageRoutingModule {}
