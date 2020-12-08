import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactcreatePageRoutingModule } from './contactcreate-routing.module';

import { ContactcreatePage } from './contactcreate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactcreatePageRoutingModule
  ],
  declarations: [ContactcreatePage]
})
export class ContactcreatePageModule {}
