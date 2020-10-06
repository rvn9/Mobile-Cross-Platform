import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemsService} from './items.service';
import {Item} from './item.model';
import {AlertController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {
  itemDetails: Item;
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
      }else {
        return;
      }
    });
  }

  async confirmDelete() {
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
          handler: () => this.deleteItem()
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


  deleteItem(){
    this.itemService.deleteItem(this.itemDetails.id);
    this.router.navigate(['/home']);
    this.deleteToast();
  }

}
