import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private dbPath = '/contact';
  contactRef: AngularFireList<Contact> = null;
  
    constructor(private db: AngularFireDatabase) {
      this.contactRef = db.list(this.dbPath);
     }
  
     getAll(): AngularFireList<Contact> {
       return this.contactRef;
     }
  
     create(contact: Contact): any {
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
}
