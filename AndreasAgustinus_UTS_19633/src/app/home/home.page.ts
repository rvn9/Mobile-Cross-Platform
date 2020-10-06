import {Component, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';
import {ItemsService} from './item-details/items.service';
import {Item} from './item-details/item.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  items: Item[];
  iconStatus = true;
  constructor(
      private menu: MenuController,
      private itemService: ItemsService,
  ) {}

  async openMenu(){
    await this.menu.enable(true, 'appMenu');
    await this.menu.open('appMenu');
  }

  toggleIcon(){
    if (this.iconStatus){
      this.iconStatus = false;
    }else {
      this.iconStatus = true;
    }
  }

  ngOnInit() {
    this.items = this.itemService.getDisplayItems();
  }

  ionViewWillEnter(){
    this.items = this.itemService.getDisplayItems();
  }
}
