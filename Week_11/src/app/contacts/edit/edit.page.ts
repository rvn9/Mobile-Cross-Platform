import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from '../contacts.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  contact: any;
  key:string;
  userID: string;

  @ViewChild('f',null)f: NgForm;
  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private db: AngularFireDatabase,
    private router:Router,
    private authSrv: AuthService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.authSrv.userDetail().subscribe(res => {
      console.log('res:',res);
      console.log('uid:',res.uid);
      if (res !== null){
        this.activatedRoute.paramMap.subscribe(paramMap => {
          if(!paramMap.get('key')) { return;}
          const key = paramMap.get('key');
          this.key = key;
    
          this.db.object('contacts/'+ key).valueChanges().subscribe(data => {
            console.log('data:', data);
            this.contact = data;
            console.log('this.contact:', this.contact);
          });
        });

        setTimeout(() => {
          this.f.setValue(this.contact);
        })
      } else{
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log(err);
    });
  }

  onSubmit(form:NgForm){
    console.log(form);

    this.contactService.update(this.key, form.value).then(res => {
      console.log(res);
      this.router.navigateByUrl('/contacts/index');
    }).catch(error => console.log(error));

    form.reset();
    this.router.navigateByUrl('/contacts/index');
  }

}
