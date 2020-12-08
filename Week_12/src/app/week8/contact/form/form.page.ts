import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ContactService} from '../../contact.service';
import {Router} from '@angular/router';
import {Contact} from '../contact.model';
import { Observable } from 'rxjs';


declare var google: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  // res: any = [];
  // data: Observable<any>;
  currLat: string;
  currLng: string;

  map: any;
  infoWindow: any = new google.maps.InfoWindow();
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  constructor(
    private contactService: ContactService,
      private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    // const contact: Contact = {
    //   nama: form.value.nama,
    //   telepon: [form.value.telepon1, form.value.telepon2 ],
    //   email: [form.value.email1, form.value.email2]
    // };
    // this.contactService.addContact(contact);
    // this.router.navigateByUrl('/contact');
    // const kontak = {
    //   nama: form.value.nama,
    //   phone: form.value.telepon,
    //   email: form.value.email,
    // };
    // this.contactService.addContact(kontak).subscribe(res =>{
    //   console.log(res);
    // });

    // this.router.navigateByUrl('/contact');

    this.contactService.create(form.value).then(res =>{
      this.router.navigateByUrl("/contact");
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
