import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ItemsService} from '../../home/item-details/items.service';
import {getLocaleId} from '@angular/common';
import {Router} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.page.html',
  styleUrls: ['./new-item.page.scss'],
})
export class NewItemPage implements OnInit {
  newItem: FormGroup;
  lastId: number;
  jenis: string = null;
  constructor(
      private itemService: ItemsService,
      private router: Router,
      private toastController: ToastController,
      private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.lastId = this.itemService.getAllItems().length;
    this.newItem = new FormGroup({
      foto: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      jenis: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      name: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      merek: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      model: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      harga: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      stok: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      baseClock: new FormControl(null, {
        updateOn: 'change',
      }),
      boostClock: new FormControl(null, {
        updateOn: 'change',
      }),
      core: new FormControl(null, {
        updateOn: 'change',
      }),
      thread: new FormControl(null, {
        updateOn: 'change',
      }),
      speed: new FormControl(null, {
        updateOn: 'change',
      }),
      ukuran: new FormControl(null, {
        updateOn: 'change',
      }),
      chipset: new FormControl(null, {
        updateOn: 'change',
      }),
      compatible: new FormControl(null, {
        updateOn: 'change',
      }),
    });
    console.log(this.lastId);
  }

  async confirmAdd() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      mode: 'ios',
      header: 'Add Item',
      message: 'Are you sure the data is correct ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Yes',
          handler: () => this.addItem()
        }
      ]
    });

    await alert.present();
  }

  async addToast() {
    const toast = await this.toastController.create({
      message: 'Item successfully added.',
      duration: 2000,
      color: 'warning'
    });
    toast.present();
  }

  addItem(){
    this.itemService.addItem(this.lastId, this.newItem);
    this.router.navigate(['/admin']);
    this.addToast();
  }
}
