import { Injectable } from '@angular/core';
import {Contact} from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contacts: Contact[] = [
    {
      id : '01',
      image: 'https://picsum.photos/300/',
      nama: 'John Thor',
      email : ['john.ghor@umn.ac.id', 'hello@johnthor.com'],
      noTelp : ['081122334455', '081234567890'],

    },
    {
      id: '02',
      image: 'https://picsum.photos/300/',
      nama: 'John Wick',
      email : ['john.wick@umn.ac.id', 'johnw.wick@gmail.com'],
      noTelp : ['081122334455', '081234567890'],
    },
  ];
  constructor() { }

  getAllContacts(){
    return [...this.contacts];
  }

  getContact(id){
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.contacts.length; i++){
      if (this.contacts[i].id === id){
        return this.contacts[i];
      }
    }
  }

  deleteContact(id: string){
    this.contacts = this.contacts.filter(contact => {
      return contact.id !== id;
    });
  }
}
