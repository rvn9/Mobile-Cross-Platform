import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContacteditPageRoutingModule } from './contactedit-routing.module';

import { ContacteditPage } from './contactedit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContacteditPageRoutingModule
  ],
  declarations: [ContacteditPage]
})
export class ContacteditPageModule {}
