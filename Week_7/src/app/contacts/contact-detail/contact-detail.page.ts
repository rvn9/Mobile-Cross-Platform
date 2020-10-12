import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactsService} from '../contacts.service';
import {Contact} from '../contacts.model';
import {AlertController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.page.html',
  styleUrls: ['./contact-detail.page.scss'],
})
export class ContactDetailPage implements OnInit {
  name: string;
  loadedContact: Contact;

  constructor(
      private activatedRoute: ActivatedRoute,
      private contactsService: ContactsService,
      private router: Router,
      private alertController: AlertController,
      private toastController: ToastController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('name')) { return; }
      this.name = paramMap.get('name');
      console.log(this.name);
      this.loadedContact = this.contactsService.getContact(this.name);
    });
  }
  deleteContact() {
    this.contactsService.deleteContact(this.name);
    this.router.navigate(['/contacts']);
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Contact deleted.',
      duration: 2000,
      color: 'danger'
    });
    await toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Delete contact?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => this.deleteContact()
        }
      ]
    });

    await alert.present();
  }
}
