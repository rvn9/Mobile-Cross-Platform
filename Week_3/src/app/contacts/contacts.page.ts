import { Component, OnInit } from '@angular/core';
import {Contact} from './contact.model';
import {ContactsService} from './contacts.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  contacts: Contact[];
  constructor(
      private contactService: ContactsService,

  ) { }

  // initialize awal //
  ngOnInit() {
    this.contacts = this.contactService.getAllContacts();
  }
  // update ketika ada yg di delete //
  ionViewWillEnter(){
    this.contacts = this.contactService.getAllContacts();
  }




}


