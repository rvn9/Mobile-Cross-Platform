import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {ContactsService} from '../../contacts.service';
import {Router} from '@angular/router';
import {Contact} from '../contact.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  form: FormGroup;
  constructor(
      private contactService: ContactsService,
      private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      nama: new FormControl(null, {
        updateOn: 'blur'
      }),
      email1: new FormControl(null, {
        updateOn: 'blur'
      }),
      email2: new FormControl(null, {
        updateOn: 'blur'
      }),
      phone1: new FormControl(null, {
        updateOn: 'blur'
      }),
      phone2: new FormControl(null, {
        updateOn: 'blur'
      }),
    });
  }
  onSubmit() {
    let contactsLength = 0;
    this.contactService.getAllContacts().subscribe(contacts => {
      contactsLength = contacts.length;
    });
    const contact: Contact = {
      contactId: (contactsLength + 1).toString(),
      nama: this.form.value.nama,
      email: [this.form.value.email1, this.form.value.email2],
      telepon: [this.form.value.phone1, this.form.value.phone2 ]
    };
    this.contactService.addContact(contact);
    this.router.navigateByUrl('/contacts');
  }
}
