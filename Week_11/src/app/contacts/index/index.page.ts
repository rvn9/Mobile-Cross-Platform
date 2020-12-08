import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from '../contacts.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  contacts: any;
  Toggle: boolean;
  constructor(
    private contactService: ContactService,
    private authSrv: AuthService,
    private navCtrl: NavController
    ) { }

  ngOnInit() {
    this.authSrv.userDetail().subscribe(res => {
      console.log('res:',res);
      console.log('uid:',res.uid);
      if (res !== null){
        this.Toggle = true;
      } else{
        this.Toggle = false;
      }
    }, err => {
      console.log(err);
    });
    this.contactService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
        )
    ).subscribe(data =>{
      this.contacts = data;
      console.log(data);
    });
  }

  delete(event, key){
    console.log(key);
    this.contactService.delete(key).then(res => {
      console.log(res);
    })
  }

  logout(){
    this.authSrv.loguotUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      });
  }
}