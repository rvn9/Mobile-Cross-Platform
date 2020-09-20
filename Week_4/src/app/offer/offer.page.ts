import { Component, OnInit } from '@angular/core';
import {Place} from '../places/place.model';
import {PlacesService} from '../places/places.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {
  places: Place[];
  constructor(
      private placesService: PlacesService,
  ) { }

  ngOnInit() {
    this.places = this.placesService.getAllPlace();
  }

}
