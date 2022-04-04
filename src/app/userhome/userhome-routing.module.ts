import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserhomePage } from './userhome.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: UserhomePage,
    children: [{
      path: 'user-search',
      children:[{
        path: '',
        loadChildren: () => import('../usersearch/usersearch.module').then(m => m.UsersearchPageModule)
      }]

    }
  ]
  },
  {
    path: '',
    component: UserhomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserhomePageRoutingModule {}
