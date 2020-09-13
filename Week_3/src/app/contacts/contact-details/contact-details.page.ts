import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactsService} from '../contacts.service';
import {Contact} from '../contact.model';
import {AlertController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.page.html',
  styleUrls: ['./contact-details.page.scss'],
})
export class ContactDetailsPage implements OnInit {
  loadContacts: Contact;
  constructor(
      private activatedRoute: ActivatedRoute,
      private contactService: ContactsService,
      private alertController: AlertController,
      private router: Router,
      private toastController: ToastController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (paramMap.has('contactId')){
        const contactId = paramMap.get('contactId');
        this.loadContacts = this.contactService.getContact(contactId);
      }else {
        return;
      }
    });
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      mode: 'ios',
      header: 'Delete Contact',
      message: 'Are you sure ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Yes',
          handler: () => this.deleteContact()
        }
      ]
    });

    await alert.present();
  }

  deleteContact(){
    this.contactService.deleteContact(this.loadContacts.id);
    this.router.navigate(['/contacts']);
    this.deleteToast();
  }

  async deleteToast() {
    const toast = await this.toastController.create({
      message: 'Contact successfully deleted.',
      duration: 2000,
      color: 'warning'
    });
    toast.present();
  }

}
