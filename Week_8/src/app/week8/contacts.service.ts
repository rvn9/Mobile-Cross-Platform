import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Contact} from './contacts/contact.model';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contacts = new BehaviorSubject<Contact[]>([
      new Contact('1', 'John Thor', ['0812', '0123'], ['john@thor.com', 'john.thor@gmail.com']),
      new Contact('2', 'John Wick', ['0813', '0124'], ['john@wick.com', 'john.wick@gmail.com'])
  ]);
  constructor() { }
  getAllContacts(){
    return this.contacts.asObservable();
  }
  getContact(contactId: string) {
    return this.contacts.pipe(
      take(1),
      map(contacts => {
        return {...contacts.find(c => c.contactId === contactId)};
      })
    );
  }
  addContact(contact: Contact) {
    this.getAllContacts().pipe(take(1)).subscribe(contacts => {
      this.contacts.next(contacts.concat(contact));
    });
  }
  deleteContact(contactId: string){
    this.getAllContacts().pipe(take(1)).subscribe(contacts => {
      this.contacts.next(contacts.filter(contact => {
        return contact.contactId !== contactId;
      }));
    });
  }
}
