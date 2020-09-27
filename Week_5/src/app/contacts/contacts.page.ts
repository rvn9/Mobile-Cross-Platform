import { Component, OnInit } from '@angular/core';
import {Contact} from './contact.model';
import {ContactsService} from './contacts.service';
import {IonItemSliding, ModalController, ToastController} from '@ionic/angular';
import {NewContactModalComponent} from './components/new-contact-modal/new-contact-modal.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  contacts: Contact[];
  constructor(
      private contactService: ContactsService,
      private modalController: ModalController,
  ) { }

  // initialize awal //
  ngOnInit() {
    this.contacts = this.contactService.getAllContacts();
  }
  // update ketika ada yg di delete //
  ionViewWillEnter(){
    this.contacts = this.contactService.getAllContacts();
  }

  createNewContact(){
    this.presentModal();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  fav(contact: Contact, slidingItems: IonItemSliding){
    slidingItems.close();
    console.log(contact.nama, 'Added to Favorites');
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: NewContactModalComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }




}


