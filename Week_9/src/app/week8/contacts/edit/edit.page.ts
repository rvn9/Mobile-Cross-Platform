import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Contact} from '../contact.model';
import {ContactsService} from '../../contacts.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  form: FormGroup;
  contactSub: Subscription;
  loadedContact: any;
  constructor(
      private activatedRoute: ActivatedRoute,
      private contactsService: ContactsService,
      private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.loadedContact = JSON.parse(params.contact);
    });
    console.log(this.loadedContact);
    this.form = new FormGroup({
      nama: new FormControl(this.loadedContact.nama, {
        updateOn: 'blur'
      }),
      email: new FormControl(this.loadedContact.email, {
        updateOn: 'blur'
      }),
      phone: new FormControl(this.loadedContact.telepon, {
        updateOn: 'blur'
      }),
    });
  }
  onSubmit() {
    this.contactsService.deleteContact(this.loadedContact.id);
    const contact: any = {
      nama: this.form.value.nama,
      email: this.form.value.email,
      telepon: this.form.value.phone
    };
    this.contactsService.addContact(contact);
    this.router.navigateByUrl('/contacts');
  }
}
