import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private dbpath = '/contacts';
  ContactRef: AngularFireList<Contact> = null;
  constructor(private db: AngularFireDatabase) {
    this.ContactRef = db.list(this.dbpath);
   }

   getAll(): AngularFireList<Contact>{
     return this.ContactRef;
   }
   
   create(Contact: Contact): any{
     return this.ContactRef.push(Contact);
   }

   update(key: string, value:any): Promise<void>{
     return this.ContactRef.update(key, value);
   }

   delete(key:string): Promise<void>{
     return this.ContactRef.remove(key);
   }

   deleteAll(): Promise<void>{
     return this.ContactRef.remove();
   }
}
