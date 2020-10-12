import { Component, OnInit } from '@angular/core';
import {Place} from '../../places.model';
import {ActivatedRoute} from '@angular/router';
import {PlacesService} from '../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  loadedPlace: Place;
  constructor(private activatedRoute: ActivatedRoute,
              private placesService: PlacesService,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) { return; }
      const placeId = paramMap.get('placeId');
      this.loadedPlace = this.placesService.getPlace(placeId);
    });
  }
}
