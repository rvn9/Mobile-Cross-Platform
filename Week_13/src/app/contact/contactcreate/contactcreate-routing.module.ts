import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactcreatePage } from './contactcreate.page';

const routes: Routes = [
  {
    path: '',
    component: ContactcreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactcreatePageRoutingModule {}
