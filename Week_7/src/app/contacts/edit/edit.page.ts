import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactsService} from '../contacts.service';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {Contact} from '../contacts.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  name: string;
  loadedContact: Contact;
  form: FormGroup;
  constructor(
      private activatedRoute: ActivatedRoute,
      private contactsService: ContactsService,
      private loadingCtrl: LoadingController,
      private toastCtrl: ToastController,
      private router: Router,
      private contactService: ContactsService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('name')) { return; }
      this.name = paramMap.get('name');
      this.loadedContact = this.contactsService.getContact(this.name);
    });
    this.form = new FormGroup({
      name: new FormControl(this.loadedContact.name, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      profileImageUrl: new FormControl(this.loadedContact.profileImageUrl, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      email: new FormControl(this.loadedContact.phone[0], {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      phone: new FormControl(this.loadedContact.email[0], {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
    });
  }
  onSave() {
    this.presentLoading().then(() => {
      const name = this.form.value.name;
      const profileImageUrl = this.form.value.profileImageUrl;
      const email = this.form.value.email;
      const phone = this.form.value.phone;
      this.contactsService.deleteContact(this.name);
      this.contactService.editContact(name, profileImageUrl, email, phone);
      this.router.navigate(['/contacts']);
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
