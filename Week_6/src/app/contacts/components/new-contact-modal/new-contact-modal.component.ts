import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-new-contact-modal',
  templateUrl: './new-contact-modal.component.html',
  styleUrls: ['./new-contact-modal.component.scss'],
})
export class NewContactModalComponent implements OnInit {

  constructor(
      public modalController: ModalController,
      public toastController: ToastController,
      public loadingController: LoadingController,
  ) { }
  ngOnInit() {}

  submitContact(){
    this.presentLoading().then(() => {
      this.modalController.dismiss(null, 'confirm');
      this.toastAddContact();
    });

  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async toastAddContact() {
    const toast = await this.toastController.create({
      message: 'Contact successfully added.',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

}
