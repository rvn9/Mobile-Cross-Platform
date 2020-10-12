import {Component, Input, OnInit} from '@angular/core';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-modal1',
  templateUrl: './modal1.component.html',
  styleUrls: ['./modal1.component.scss'],
})
export class Modal1Component implements OnInit {
  constructor(
      private modalCtrl: ModalController,
      private loadingCtrl: LoadingController,
      private toastCtrl: ToastController
  ) { }

  ngOnInit() {}
  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
  onSave() {
    this.presentLoading().then(() => {
      this.modalCtrl.dismiss({message: 'contact saved'}, 'confirm');
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
