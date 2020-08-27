import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  

  total_pengeluaran:number = 0;
  nama_pengeluaran:string;
  harga_pengeluaran:string;
  list_pengeluaran =[];

 

  constructor(public alertController: AlertController) {}

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      mode:'ios',
      header: 'Terjadi Kesalahan',
      message: 'Harap masukan nama pengeluaran dan harga pengeluatan.',
      buttons: [
        {
          text: 'Tutup',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ]
    });

    await alert.present();
  }
  
  // handler number only // 
  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }


  addItem(){
    let pengeluaran ={
      nama:this.nama_pengeluaran,
      harga:this.harga_pengeluaran
    };
    

    // error show allert // 
    if(pengeluaran.nama == null || pengeluaran.harga == null){
      this.presentAlertConfirm();
      return 0;
    }

    // push ke array // 
    this.list_pengeluaran.push(pengeluaran);
    this.total_pengeluaran= parseInt(this.harga_pengeluaran) + this.total_pengeluaran;
    // set input balik ke awal // 
    this.nama_pengeluaran = null;
    this.harga_pengeluaran = null;
    
  }

  deleteItem(index){
    this.total_pengeluaran = this.total_pengeluaran - parseInt(this.list_pengeluaran[index].harga)
    this.list_pengeluaran.splice(index, 1);
  }

}
