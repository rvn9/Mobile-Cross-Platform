import { Injectable } from '@angular/core';
import {Item} from './item.model';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  displayItems = [];
  private items: Item[] = [
    {
      id: '01',
      nama: 'Ini pc geming',
      jenis: 'RAM',
      foto: 'https://picsum.photos/300/',
      merek: 'Lorem Ipsum',
      model: 'Lorem Ipsum',
      deskripsi: {
        baseClock: 'lorem ipsum',
        boostClock: 'lorem ipsum',
        jumlahCore: 'lorem ipsum',
        thread: 'lorem ipsum',
        speed: 'lorem ipsum',
        ukuran: 'lorem ipsum',
        chipset: 'lorem ipsum',
        compatible: 'lorem ipsom',
      },
      harga:  125000,
      stok: 10,
    },
    {
      id: '02',
      nama: 'Ini pc geming',
      jenis: 'RAM',
      foto: 'https://picsum.photos/300/',
      merek: 'Lorem Ipsum',
      model: 'Lorem Ipsum',
      deskripsi: {
        baseClock: 'lorem ipsum',
        boostClock: 'lorem ipsum',
        jumlahCore: 'lorem ipsum',
        thread: 'lorem ipsum',
        speed: 'lorem ipsum',
        ukuran: 'lorem ipsum',
        chipset: 'lorem ipsum',
        compatible: 'lorem ipsom',
      },
      harga:  125000,
      stok: 10,
    },
    {
      id: '03',
      nama: 'Ini pc geming',
      jenis: 'RAM',
      foto: 'https://picsum.photos/300/',
      merek: 'Lorem Ipsum',
      model: 'Lorem Ipsum',
      deskripsi: {
        baseClock: 'lorem ipsum',
        boostClock: 'lorem ipsum',
        jumlahCore: 'lorem ipsum',
        thread: 'lorem ipsum',
        speed: 'lorem ipsum',
        ukuran: 'lorem ipsum',
        chipset: 'lorem ipsum',
        compatible: 'lorem ipsom',
      },
      harga:  125000,
      stok: 10,
    },
    {
      id: '04',
      nama: 'Ini pc geming',
      jenis: 'GPU',
      foto: 'https://picsum.photos/300/',
      merek: 'Lorem Ipsum',
      model: 'Lorem Ipsum',
      deskripsi: {
        baseClock: 'lorem ipsum',
        boostClock: 'lorem ipsum',
        jumlahCore: 'lorem ipsum',
        thread: 'lorem ipsum',
        speed: 'lorem ipsum',
        ukuran: 'lorem ipsum',
        chipset: 'lorem ipsum',
        compatible: 'lorem ipsom',
      },
      harga:  125000,
      stok: 10,
    },
    {
      id: '05',
      nama: 'Ini pc geming',
      jenis: 'GPU',
      foto: 'https://picsum.photos/300/',
      merek: 'Lorem Ipsum',
      model: 'Lorem Ipsum',
      deskripsi: {
        baseClock: 'lorem ipsum',
        boostClock: 'lorem ipsum',
        jumlahCore: 'lorem ipsum',
        thread: 'lorem ipsum',
        speed: 'lorem ipsum',
        ukuran: 'lorem ipsum',
        chipset: 'lorem ipsum',
        compatible: 'lorem ipsom',
      },
      harga:  125000,
      stok: 10,
    },
    {
      id: '06',
      nama: 'Ini pc geming',
      jenis: 'GPU',
      foto: 'https://picsum.photos/300/',
      merek: 'Lorem Ipsum',
      model: 'Lorem Ipsum',
      deskripsi: {
        baseClock: 'lorem ipsum',
        boostClock: 'lorem ipsum',
        jumlahCore: 'lorem ipsum',
        thread: 'lorem ipsum',
        speed: 'lorem ipsum',
        ukuran: 'lorem ipsum',
        chipset: 'lorem ipsum',
        compatible: 'lorem ipsom',
      },
      harga:  125000,
      stok: 10,
    },
    {
      id: '07',
      nama: 'Ini pc geming',
      jenis: 'CPU',
      foto: 'https://picsum.photos/300/',
      merek: 'Lorem Ipsum',
      model: 'Lorem Ipsum',
      deskripsi: {
        baseClock: 'lorem ipsum',
        boostClock: 'lorem ipsum',
        jumlahCore: 'lorem ipsum',
        thread: 'lorem ipsum',
        speed: 'lorem ipsum',
        ukuran: 'lorem ipsum',
        chipset: 'lorem ipsum',
        compatible: 'lorem ipsom',
      },
      harga:  125000,
      stok: 10,
    },
    {
      id: '08',
      nama: 'Ini pc geming',
      jenis: 'CPU',
      foto: 'https://picsum.photos/300/',
      merek: 'Lorem Ipsum',
      model: 'Lorem Ipsum',
      deskripsi: {
        baseClock: 'lorem ipsum',
        boostClock: 'lorem ipsum',
        jumlahCore: 'lorem ipsum',
        thread: 'lorem ipsum',
        speed: 'lorem ipsum',
        ukuran: 'lorem ipsum',
        chipset: 'lorem ipsum',
        compatible: 'lorem ipsom',
      },
      harga:  125000,
      stok: 10,
    },
    {
      id: '09',
      nama: 'Ini pc geming',
      jenis: 'Motherboard',
      foto: 'https://picsum.photos/300/',
      merek: 'Lorem Ipsum',
      model: 'Lorem Ipsum',
      deskripsi: {
        baseClock: 'lorem ipsum',
        boostClock: 'lorem ipsum',
        jumlahCore: 'lorem ipsum',
        thread: 'lorem ipsum',
        speed: 'lorem ipsum',
        ukuran: 'lorem ipsum',
        chipset: 'lorem ipsum',
        compatible: 'lorem ipsom',
      },
      harga:  125000,
      stok: 10,
    },
    {
      id: '10',
      nama: 'Ini pc geming',
      jenis: 'Motherboard',
      foto: 'https://picsum.photos/300/',
      merek: 'Lorem Ipsum',
      model: 'Lorem Ipsum',
      deskripsi: {
        baseClock: 'lorem ipsum',
        boostClock: 'lorem ipsum',
        jumlahCore: 'lorem ipsum',
        thread: 'lorem ipsum',
        speed: 'lorem ipsum',
        ukuran: 'lorem ipsum',
        chipset: 'lorem ipsum',
        compatible: 'lorem ipsom',
      },
      harga:  125000,
      stok: 0,
    },
    {
      id: '11',
      nama: 'Ini pc geming',
      jenis: 'Motherboard',
      foto: 'https://picsum.photos/300/',
      merek: 'Lorem Ipsum',
      model: 'Lorem Ipsum',
      deskripsi: {
        baseClock: 'lorem ipsum',
        boostClock: 'lorem ipsum',
        jumlahCore: 'lorem ipsum',
        thread: 'lorem ipsum',
        speed: 'lorem ipsum',
        ukuran: 'lorem ipsum',
        chipset: 'lorem ipsum',
        compatible: 'lorem ipsom',
      },
      harga:  125000,
      stok: 10,
    },

  ];

  constructor() { }

  getAllItems(){
    return [...this.items];
  }

  getDisplayItems(){
    this.displayItems = [];
    let j = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < this.items.length; i++){
      if (this.items[i].stok > 0){
        this.displayItems[j] = this.items[i];
        j++;
      }
    }
    return [...this.displayItems];
  }

  getItem(itemId){
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.items.length; i++){
      if (this.items[i].id === itemId){
        return this.items[i];
      }
    }
  }

  deleteItem(itemId){
    this.items = this.items.filter(item => {
      return item.id !== itemId;
    });
  }

  addItem(itemId, data: FormGroup){
    const newItemId = itemId + 1;
    const pushData = {
      id: newItemId.toString(),
      nama: data.value.name,
      jenis: data.value.jenis,
      foto: data.value.foto,
      merek: data.value.merek,
      model: data.value.model,
      deskripsi: {
        baseClock: data.value.baseClock,
        boostClock: data.value.boostClock,
        jumlahCore: data.value.core,
        thread: data.value.thread,
        speed: data.value.speed,
        ukuran: data.value.ukuran,
        chipset: data.value.chipset,
        compatible: data.value.compatible
      },
      harga: data.value.harga,
      stok: data.value.stok
    };

    this.items.push(pushData);
  }

  editItem(id,
           foto,
           nama,
           model,
           harga,
           stok,
           baseClock,
           boostClock,
           jumlahCore,
           thread,
           speed,
           ukuran,
           chipset,
           compatible){
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.items.length; i++){
      if (this.items[i].id === id){
        this.items[i].nama = nama;
        this.items[i].foto = foto;
        this.items[i].model = model;
        this.items[i].stok = stok;
        this.items[i].harga = harga;
        this.items[i].deskripsi.baseClock = baseClock;
        this.items[i].deskripsi.boostClock = boostClock;
        this.items[i].deskripsi.jumlahCore = jumlahCore;
        this.items[i].deskripsi.thread = thread;
        this.items[i].deskripsi.speed = speed;
        this.items[i].deskripsi.ukuran = ukuran;
        this.items[i].deskripsi.chipset = chipset;
        this.items[i].deskripsi.compatible = compatible;
      }
    }

  }
}
