import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactsPageRoutingModule } from './contacts-routing.module';

import { ContactsPage } from './contacts.page';
import {Sample2Component} from './components/sample2/sample2.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ContactsPageRoutingModule
  ],
    declarations: [ContactsPage, Sample2Component]
})
export class ContactsPageModule {}
