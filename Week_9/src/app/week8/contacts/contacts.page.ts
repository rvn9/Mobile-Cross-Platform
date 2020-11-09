import {Component, OnDestroy, OnInit} from '@angular/core';
import {Contact} from './contact.model';
import {Subscription} from 'rxjs';
import {ContactsService} from '../contacts.service';
import {AlertController, LoadingController, NavController, ToastController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {NavigationEnd, NavigationExtras, Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit, OnDestroy {
  contacts: any;
  private contactSub: Subscription;
  constructor(
      private contactsService: ContactsService,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingController,
      private http: HttpClient,
      private router: Router,
      private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.router.events.pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.contactSub = this.contactsService.getAllContacts().subscribe(contacts => {
        this.contacts = contacts;
      });
    });
  }
  ngOnDestroy(){
    if (this.contactSub) {
      this.contactSub.unsubscribe();
    }
  }
  editContact(contactId: number, contactNama, contactEmail, contactTelepon) {
    const loadedContact = {
      id: contactId,
      nama: contactNama,
      email: contactEmail,
      telepon: contactTelepon
    };
    const navigationExtras: NavigationExtras = {
      queryParams: {
        contact: JSON.stringify(loadedContact)
      }
    };
    this.navCtrl.navigateForward(['contacts', 'edit', contactId], navigationExtras);
  }
  deleteContact(id: number) {
    this.presentLoading().then(() => {
      this.contactsService.deleteContact(id);
      this.contactSub = this.contactsService.getAllContacts().subscribe(contacts => {
        this.contacts = contacts;
      });
      this.presentToast();
    });
  }
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Contact deleted.',
      duration: 2000,
      color: 'danger'
    });
    await toast.present();
  }
  async presentDeleteAlert(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Delete this contact?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => this.deleteContact(id)
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
  }
}
