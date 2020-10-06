import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemsService} from '../../home/item-details/items.service';
import {AlertController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage implements OnInit {
  itemDetails;
  editedNama: string;
  editedFoto: string;
  editedModel: string;
  editedHarga: number;
  editedStok: number;
  editedBaseClock: string;
  editedBoostClock: string;
  editedCore: string;
  editedThread: string;
  editedSpeed: string;
  editedUkuran: string;
  editedChipset: string;
  editedCompatible: string;

  private editedItem = {
    nama: '',
    jenis: '',
    foto: '',
    merek: '',
    model: '',
    deskripsi: {
      baseClock: '',
      boostClock: '',
      jumlahCore: '',
      thread: '',
      speed: '',
      ukuran: '',
      chipset: '',
      compatible: '',
    },
    harga:  0,
    stok: 0,
  };

  constructor(
      private activatedRoute: ActivatedRoute,
      private itemService: ItemsService,
      private router: Router,
      private toastController: ToastController,
      private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (paramMap.has('itemId')){
        const itemId = paramMap.get('itemId');
        this.itemDetails = this.itemService.getItem(itemId);

        this.editedFoto = this.itemDetails.foto;
        this.editedNama = this.itemDetails.nama;
        this.editedModel = this.itemDetails.model;
        this.editedHarga = this.itemDetails.harga;
        this.editedStok = this.itemDetails.stok;
        this.editedBaseClock = this.itemDetails.deskripsi.baseClock;
        this.editedBoostClock = this.itemDetails.deskripsi.boostClock;
        this.editedCore = this.itemDetails.deskripsi.jumlahCore;
        this.editedThread = this.itemDetails.deskripsi.thread;
        this.editedSpeed = this.itemDetails.deskripsi.speed;
        this.editedUkuran = this.itemDetails.deskripsi.ukuran;
        this.editedChipset = this.itemDetails.deskripsi.chipset;
        this.editedCompatible = this.itemDetails.deskripsi.compatible;

      }else {
        return;
      }
    });
  }

  async confirmEdit() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      mode: 'ios',
      header: 'Edit Item',
      message: 'Save Changes ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Yes',
          handler: () => this.editItem()
        }
      ]
    });

    await alert.present();
  }

  async editToast() {
    const toast = await this.toastController.create({
      message: 'Item successfully edited.',
      duration: 2000,
      color: 'warning'
    });
    toast.present();
  }

  editItem(){
    this.itemService.editItem(
        this.itemDetails.id,
        this.editedFoto,
        this.editedNama,
        this.editedModel,
        this.editedHarga,
        this.editedStok,
        this.editedBaseClock,
        this.editedBoostClock,
        this.editedCore,
        this.editedThread,
        this.editedSpeed,
        this.editedUkuran,
        this.editedChipset,
        this.editedCompatible,
    );
    this.router.navigate(['/admin']);
    this.editToast();
  }

}
