import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PlacesService} from '../../places/places.service';
import {NavController} from '@ionic/angular';
import {Place} from '../../places/place.model';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  loadPlace: Place;
  constructor(
      private activatedRoute: ActivatedRoute,
      private placeService: PlacesService,
      private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (paramMap.has('placeId')){
        const placeId = paramMap.get('placeId');
        this.loadPlace = this.placeService.getPlace(placeId);
      }else {
        return;
      }
    });
  }

}
