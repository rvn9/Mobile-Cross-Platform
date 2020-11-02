import {Component, OnDestroy, OnInit} from '@angular/core';
import {Contact} from './contact.model';
import {Subscription} from 'rxjs';
import {ContactsService} from '../contacts.service';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit, OnDestroy {
  contacts: Contact[];
  private contactSub: Subscription;
  constructor(
      private contactsService: ContactsService,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.contactSub = this.contactsService.getAllContacts().subscribe(contacts => {
      this.contacts = contacts;
    });
  }
  ngOnDestroy(){
    if (this.contactSub) {
      this.contactSub.unsubscribe();
    }
  }
  editContact(contactId: string) {
    console.log(contactId);
  }
  deleteContact(contactId: string) {
    this.presentLoading().then(() => {
      this.contactsService.deleteContact(contactId);
      console.log(contactId);
      this.presentToast();
    });
  }
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Contact deleted.',
      duration: 2000,
      color: 'danger'
    });
    await toast.present();
  }
  async presentDeleteAlert(contactId: string) {
    const alert = await this.alertCtrl.create({
      header: 'Delete this contact?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => this.deleteContact(contactId)
        }
      ]
    });
    await alert.present();
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Deleting contact...',
      duration: 500
    });
    await loading.present();
    const {role, data} = await loading.onDidDismiss();
    console.log('Loading dismissed');
  }
}
