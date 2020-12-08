import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import {NgForm} from '@angular/forms';
import { Contact } from '../contact.model';
import { ContactService } from '../../contact.service';
import {ActivatedRoute, Router} from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';

declare var google: any;
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  // private nama:string;
  // private telepon:string;
  // private email:string;
  // private id:string;

  // contacts: Contact;
  // private contactsSub: Subscription;
  // private tempNama:string;

  currLat: string;
  currLng: string;
  map: any;
  infoWindow: any = new google.maps.InfoWindow();
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  contact: any;
  key: string;
  userEmail: string;

  @ViewChild('f', null) f: NgForm;


  constructor(
    private contactSrv: ContactService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private db: AngularFireDatabase,
    private authSrv: AuthService,
    private navCtl: NavController,
    ) { }

  ngOnInit() {
    // this.activatedRoute.paramMap.subscribe(paramMap => {
    //   if (!paramMap.has('contactId')) { return; }
    //   const contactId = paramMap.get('contactId');
    //   this.contactsSub = this.contactSrv.getContact(contactId).subscribe(contacts => {
    //     this.id = contacts.id;
    //     this.nama = contacts.nama;
    //     this.telepon = contacts.phone;
    //     this.email = contacts.email;

    //   });
    // });

    this.authSrv.userDetails().subscribe(res => {
      console.log('uid:', res.uid);
      if(res.uid != null){
        this.userEmail = res.uid;
      }else{
      }
    }, err => {
      console.log(err);
    })

    if(this.userEmail){
      this.activatedRoute.paramMap.subscribe(paramMap => {
        if(!paramMap.has('key')){ return; }
        const key = paramMap.get('key');
        this.key = key;
        
        this.db.object('/contact/' + key).valueChanges().subscribe(data => {
          console.log('data: ', data);
          this.contact = data;
          console.log('this.contact : ', this.contact);
        });
      });
  
      setTimeout( () => {
        this.f.setValue(this.contact);
      });

    }else {
      this.navCtl.navigateForward('/login');
    }
    

   
  }


  onSubmit(form: NgForm){
    
    // const contact: Contact = {
    //   nama: form.value.nama,
    //   telepon: form.value.telepon,
    //   email: form.value.email
    // };
    // this.contactSrv.editContact(contact,this.id).subscribe(res => {

    // })
    // this.router.navigateByUrl('/contact');
    this.contactSrv.update(this.key, form.value).then(res => {
      this.router.navigateByUrl('/contact');
    }).catch(error => console.log(error));

    form.reset();
    this.router.navigateByUrl('/contact');
  }

  showCurrentLoc(){
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.currLat = position.coords.latitude.toString();
        this.currLng = position.coords.longitude.toString();
        console.log(pos);
       
      })
    }
  }

}
