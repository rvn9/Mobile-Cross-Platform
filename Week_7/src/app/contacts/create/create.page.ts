import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';
import {ContactsService} from '../contacts.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  constructor(
      private modalCtrl: ModalController,
      private loadingCtrl: LoadingController,
      private toastCtrl: ToastController,
      private router: Router,
      private contactService: ContactsService
  ) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    this.presentLoading().then(() => {
      const name = form.value.name;
      const profileImageUrl = form.value.profileImageUrl;
      const email = form.value.email;
      const phone = form.value.phone;
      this.contactService.addContact(name, profileImageUrl, email, phone);
      this.router.navigate(['/contacts']);
      this.presentToast();
    });
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Saving Contact...',
      duration: 2000
    });
    await loading.present();
    const {role, data} = await loading.onDidDismiss();
    console.log('loading dismissed');
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Contact Saved',
      duration: 2000,
      color: 'primary'
    });
    await toast.present();
  }
}
