import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactindexPage } from './contactindex.page';

const routes: Routes = [
  {
    path: '',
    component: ContactindexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactindexPageRoutingModule {}
