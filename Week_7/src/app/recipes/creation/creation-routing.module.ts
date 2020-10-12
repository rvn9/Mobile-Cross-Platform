import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreationPage } from './creation.page';

const routes: Routes = [
  {
    path: '',
    component: CreationPage
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreationPageRoutingModule {}
