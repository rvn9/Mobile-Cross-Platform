import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contactedit',
  templateUrl: './contactedit.page.html',
  styleUrls: ['./contactedit.page.scss'],
})
export class ContacteditPage implements OnInit {

  contact: any;
  key: string;

  @ViewChild('f', null) f: NgForm;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cntSrv: ContactService,
    private db: AngularFireDatabase,
    private router: Router 
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( paramMap => {
      if(!paramMap.has('contactKey')) {return; }
      const key = paramMap.get('contactKey');
      this.key = key;
      console.log(key);

      this.db.object('/contact/' + key).valueChanges().subscribe(data => {
        console.log('data: ', data);
        this.contact = data;
        console.log('this.contact: ', this.contact);
      });
    });

    setTimeout(() => {
      this.f.setValue(this.contact);
    });
  }

  onSubmit(form: NgForm){
    console.log(form);

    this.cntSrv.update(this.key, form.value).then(res => {
      console.log(res);
      this.router.navigateByUrl('/contactindex');
    }).catch(error => console.log(error));

    form.reset();
    this.router.navigateByUrl('/contactindex');
  }
}
