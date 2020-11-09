import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {ContactsService} from '../../contacts.service';
import {Router} from '@angular/router';
import {Contact} from '../contact.model';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  form: FormGroup;
  constructor(
      private contactService: ContactsService,
      private router: Router,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      nama: new FormControl(null, {
        updateOn: 'blur'
      }),
      email1: new FormControl(null, {
        updateOn: 'blur'
      }),
      phone1: new FormControl(null, {
        updateOn: 'blur'
      }),
    });
  }
  addContact() {
    this.presentLoading().then(() => {
      const contact: any = {
        nama: this.form.value.nama,
        email: this.form.value.email1,
        telepon: this.form.value.phone1
      };
      this.contactService.addContact(contact);
      this.router.navigateByUrl('/contacts');
      this.presentToast();
    });
  }
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Contact added.',
      duration: 2000,
      color: 'primary'
    });
    await toast.present();
  }
  async presentAddAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Add this contact?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => this.addContact()
        }
      ]
    });
    await alert.present();
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Adding contact...',
      duration: 500
    });
    await loading.present();
    const {role, data} = await loading.onDidDismiss();
  }
}
