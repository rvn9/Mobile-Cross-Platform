import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Contact} from './contacts/contact.model';
import {map, take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contacts = new BehaviorSubject<Contact[]>([
      new Contact('2', 'John Wick', '0813', 'john@wick.com')
  ]);
  constructor(
      private http: HttpClient
  ) { }
  getAllContacts(){
    return this.http.get('http://localhost/ionic_week9/task/select.php');
  }
  getContact(id: number) {
    const data = JSON.stringify({id});
    return this.http.post<any>('http://localhost/ionic_week9/task/get.php', data);
  }
  addContact(contact: any) {
    const data = JSON.stringify(contact);
    this.http.post<any>('http://localhost/ionic_week9/task/insert.php', data).subscribe();
  }
  deleteContact(id: number){
    const data = JSON.stringify({id});
    return this.http.post<any>('http://localhost/ionic_week9/task/delete.php', data).subscribe();
  }
}
