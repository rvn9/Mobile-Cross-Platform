import { Component, OnInit } from '@angular/core';
import {Contact} from './contacts.model';
import {ContactsService} from './contacts.service';
import {IonItemSliding, ModalController} from '@ionic/angular';
import {Modal1Component} from './components/modal1/modal1.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  contacts: Contact[];
  constructor(
      private contactService: ContactsService,
      private modalCtrl: ModalController,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.contacts = this.contactService.getAllContacts();
  }
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: Modal1Component
    });
    modal.onDidDismiss().then(resultData => {
      console.log(resultData.data, resultData.role);
    });
    return await modal.present();
  }
  priority(contact: Contact, slidingItem: IonItemSliding){
    slidingItem.close();
    console.log(contact.name + ' is set as priority contact');
  }
  onFilterUpdate(event: CustomEvent) {
    console.log(event.detail);
  }
}
