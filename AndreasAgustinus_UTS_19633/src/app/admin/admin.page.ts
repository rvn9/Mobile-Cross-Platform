import { Component, OnInit } from '@angular/core';
import {AlertController, IonItemSliding, MenuController, ToastController} from '@ionic/angular';
import {Item} from '../home/item-details/item.model';
import {ItemsService} from '../home/item-details/items.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  iconStatus;
  items: Item[];
  constructor(
      private menu: MenuController,
      private itemService: ItemsService,
      private router: Router,
      private toastController: ToastController,
      private alertController: AlertController,
  ) { }

  async openMenu(){
    await this.menu.enable(true, 'appMenu');
    await this.menu.open('appMenu');
  }
  // ABIS ADA YG DI DELETE //
  reload(){
    this.items = this.itemService.getDisplayItems();
  }
  // INIT AWAL //
  ngOnInit(){
    this.items = this.itemService.getDisplayItems();
  }
  // ABIS ADD BARU //
  ionViewWillEnter(){
    this.items = this.itemService.getDisplayItems();
  }

  async confirmDelete(item: Item, slidingItems: IonItemSliding) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      mode: 'ios',
      header: 'Delete Item',
      message: 'Are you sure ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Yes',
          handler: () => this.delete(item.id, slidingItems)
        }
      ]
    });

    await alert.present();
  }

  async deleteToast() {
    const toast = await this.toastController.create({
      message: 'Item successfully deleted.',
      duration: 2000,
      color: 'warning'
    });
    toast.present();
  }

  delete(itemId, slidingItems){
    this.itemService.deleteItem(itemId);
    slidingItems.close();
    this.router.navigate(['/admin']);
    this.deleteToast();
    this.reload();
  }

  edit(item: Item, slidingItems: IonItemSliding){
    slidingItems.close();
  }
}
