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
  loadedContact: Contact;
  contactId: string;
  constructor(
      private activatedRoute: ActivatedRoute,
      private contactsService: ContactsService,
      private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('contactId')) { return; }
      this.contactId = paramMap.get('contactId');
      this.contactSub = this.contactsService.getContact(this.contactId).subscribe(contact => {
        this.loadedContact = contact;
      });
    });
    this.form = new FormGroup({
      nama: new FormControl(this.loadedContact.nama, {
        updateOn: 'blur'
      }),
      email1: new FormControl(this.loadedContact.email[0], {
        updateOn: 'blur'
      }),
      email2: new FormControl(this.loadedContact.email[1], {
        updateOn: 'blur'
      }),
      phone1: new FormControl(this.loadedContact.telepon[0], {
        updateOn: 'blur'
      }),
      phone2: new FormControl(this.loadedContact.telepon[1], {
        updateOn: 'blur'
      }),
    });
  }
  onSubmit() {
    this.contactsService.deleteContact(this.contactId);
    let contactsLength = 0;
    this.contactsService.getAllContacts().subscribe(contacts => {
      contactsLength = contacts.length;
    });
    const contact: Contact = {
      contactId: (contactsLength + 1).toString(),
      nama: this.form.value.nama,
      email: [this.form.value.email1, this.form.value.email2],
      telepon: [this.form.value.phone1, this.form.value.phone2 ]
    };
    this.contactsService.addContact(contact);
    this.router.navigateByUrl('/contacts');
  }
}
