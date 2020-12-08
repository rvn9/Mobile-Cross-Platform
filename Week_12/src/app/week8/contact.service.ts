import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Contact } from './contact/contact.model';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private dbPath = '/contact'
  contactRef: AngularFireList<Contact> = null;

  constructor(private db: AngularFireDatabase) {
    this.contactRef = db.list(this.dbPath);
   }

   getAll(): AngularFireList<Contact> {
    return this.contactRef;
  }

  create(contact : Contact): any {
    return this.contactRef.push(contact);
  }

  update(key: string, value: any): Promise<void> {
    return this.contactRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.contactRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.contactRef.remove();
  }

  // getAllContacts(){
  //   return this.http.get('http://localhost/selectKontak.php');
  // }

  // getContact(nama: string){
  //   return this.contacts.pipe(
  //     take(1),
  //     map(contacts => {
  //       return {...contacts.find(s => s.nama === nama)};
  //     })
  //   );
  // }

  // getContact(idKontak: string){
  //   const data = JSON.stringify({id: idKontak});
  //   return this.http.post<any>('http://localhost/detailKontak.php', data);
  // }

  // addContact(contact: Contact){
  //   this.getAllContacts().pipe(take(1)).subscribe(contacts =>{
  //     this.contacts.next(contacts.concat(contact));
  //   })
  // }

  // addContact(newKontak: any){
  //   const kontak = {
  //     nama: newKontak.nama,
  //     phone: newKontak.phone,
  //     email: newKontak.email,
  //   };
  //   const data = JSON.stringify(kontak);
  //   return this.http.post<any>('http://localhost/inputKontak.php', data);
  // }

  // deleteContact(nama: string){
  //   this.getAllContacts().pipe(take(1)).subscribe(contacts => {
  //     this.contacts.next(contacts.filter(contact => {
  //       return contact.nama !== nama;
  //     }));
  //   });
  // }

  // deleteContact(idKontak: string){
  //   const data = JSON.stringify({id: idKontak});
  //   return this.http.post<any>('http://localhost/deleteKontak.php', data);
  // }

  // editContact(contactForm: Contact, contactOld: string){
  //   this.deleteContact(contactOld);
  //   this.addContact(contactForm);
  // }

  // editContact(editKontak: any, id: string){
  //   const kontak = {
  //     id: id,
  //     nama: editKontak.nama,
  //     phone: editKontak.telepon,
  //     email: editKontak.email,
  //   };
  //   const data = JSON.stringify(kontak);
  //   return this.http.post<any>('http://localhost/updateKontak.php', data)
  // }

}
