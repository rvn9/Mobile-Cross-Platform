import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-contactindex',
  templateUrl: './contactindex.page.html',
  styleUrls: ['./contactindex.page.scss'],
})
export class ContactindexPage implements OnInit {

  contact: any;
  constructor(private cntSrv: ContactService) { }

  ngOnInit() {
    this.cntSrv.getAll().snapshotChanges().pipe(
        map(changes => 
          changes.map(c => ({key: c.payload.key, ...c.payload.val()}))  
        )
    ).subscribe(data => {
      this.contact = data;
      console.log(data);
    });
  }

  delete(event, key){
    console.log(key);
    this.cntSrv.delete(key).then(res => {
      console.log(res);
    })
  }

}
