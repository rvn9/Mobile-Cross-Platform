import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactindexPageRoutingModule } from './contactindex-routing.module';

import { ContactindexPage } from './contactindex.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactindexPageRoutingModule
  ],
  declarations: [ContactindexPage]
})
export class ContactindexPageModule {}
