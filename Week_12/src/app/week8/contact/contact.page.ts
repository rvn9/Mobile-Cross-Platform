import { Component, OnDestroy, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import { ContactService } from '../contact.service';
import {AlertController, LoadingController, NavController, ToastController} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  contacts: any;
  userEmail: string;
  
  constructor(
    private contactSrv: ContactService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private authSrv: AuthService,
    private navCtl: NavController
    ) { }

  ngOnInit() {

  
    this.authSrv.userDetails().subscribe(res => {
      console.log('uid:', res.uid);
      if(res.uid != null){
        this.userEmail = res.uid;
      }else{
      }
    }, err => {
      console.log(err);
    })

    this.contactSrv.getAll().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
        )
    ).subscribe(data => {
      this.contacts = data;
      console.log(data);
    });
      

    // this.contactsSub = this.contactSrv.getAllContacts().subscribe(contacts => {
    //   this.contacts = contacts;
    // })
    // this.contactSrv.getAllContacts().subscribe((res) => {
    //   this.contacts = res;

    // })
  }

  delete(event, key){
    if(this.userEmail){
      this.contactSrv.delete(key).then(res => {
        console.log(res);
      })
    }else{
      this.navCtl.navigateForward('/login');
    }

  }

  // ionViewWillEnter(){
  //   this.contactSrv.getAllContacts().subscribe((res) => {
  //     this.contacts = res;

  //   })
  // }

  // deleteContact(event, id) {
  //   this.presentLoading().then(() => {
  //     // this.contactSrv.deleteContact(id);
  //     this.contactSrv.deleteContact(id).subscribe(res => {
  //       window.location.reload();
  //     })
  //     this.presentToast();
  //   });
  // }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Contact deleted.',
      duration: 2000,
      color: 'danger'
    });
    await toast.present();
  }
  async presentDeleteAlert(event, key) {
    const alert = await this.alertCtrl.create({
      header: 'Delete this contact?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => this.delete(event, key)
        }
      ]
    });
    await alert.present();
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Deleting contact...',
      duration: 500
    });
    await loading.present();
    const {role, data} = await loading.onDidDismiss();
    console.log('Loading dismissed');
  }

  gotoContact(){

    if(!this.userEmail) {
      this.navCtl.navigateForward('/login');
    }
    else{
      this.navCtl.navigateForward('/contact/form');
    }
  }

}
