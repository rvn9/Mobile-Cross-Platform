import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ContactService } from '../week8/contact.service';
import {map} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


declare var google: any;

@Component({
  selector: 'app-display-map',
  templateUrl: './display-map.page.html',
  styleUrls: ['./display-map.page.scss'],
})
export class DisplayMapPage implements OnInit {

  contacts: any;
  map: any;
  key: string;
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
  umnPos: any = {
    lat: -6.256081,
    lng: 106.618755
  };
  
  constructor(
    private authSrv: AuthService, 
    private contactSrv: ContactService,
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('key')) { return; }
      this.key = paramMap.get('key');
    })


    this.contactSrv.getAll().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
        )
    ).subscribe(data => {
      this.contacts = data;
      console.log(data);
    });
  }

  ionViewDidEnter(){
    this.showMap(this.umnPos);
  }



  showMap(pos: any) {
    const location = new google.maps.LatLng(Number(this.contacts[this.key].Lat), Number(this.contacts[this.key].Lng));
    const options = {
      center: location,
      zoom: 13,
      disableDefaultUI: true
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);

    var MarkCurr = {
      lat: Number(this.contacts[this.key].Lat),
      lng: Number(this.contacts[this.key].Lng)
    }

    //marker
    const marker = new google.maps.Marker({
      position: MarkCurr,
      map: this.map,
    })
  }

}
