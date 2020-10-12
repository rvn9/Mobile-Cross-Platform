import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PlacesService} from '../../places.service';
import {Place} from '../../places.model';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
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
