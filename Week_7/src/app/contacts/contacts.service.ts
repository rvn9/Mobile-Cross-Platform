import { Injectable } from '@angular/core';
import {Contact} from './contacts.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contacts: Contact[] = [
    {
      name: 'John Thor',
      profileImageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/Chris_Hemsworth_as_Thor.jpg/220px-Chris_Hemsworth_as_Thor.jpg',
      email: ['john.thor@umn.ac.id', 'hello@johnthor.com'],
      phone: ['081122334455', '081234567890']
    },
    {
      name: 'John Wick',
      profileImageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/John_Wick_Keanu.jpeg/220px-John_Wick_Keanu.jpeg',
      email: ['john.wick@umn.ac.id', 'john.wick@gmail.com'],
      phone: ['087812312300', '081512131415']
    }
  ];
  constructor() {}
  getAllContacts(){
    return [...this.contacts];
  }
  getContact(name: string){
    return {...this.contacts.find(contact => {
        return contact.name === name;
      })};
  }
  deleteContact(name: string){
    this.contacts = this.contacts.filter(contact => {
      return contact.name !== name;
    });
  }
  addContact(name: string, profileImageUrl: string, email: string, phone: string) {
    this.contacts.push({
      name,
      profileImageUrl,
      email: [email],
      phone: [phone]
    });
  }
  editContact(name: string, profileImageUrl: string, email: string, phone: string) {
    this.contacts.push({
      name,
      profileImageUrl,
      email: [email],
      phone: [phone]
    });
  }
}
