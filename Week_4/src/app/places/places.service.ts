import { Injectable } from '@angular/core';
import {Place} from './place.model';

@Injectable({
  providedIn: 'root'
})

export class PlacesService {
  private places: Place[] = [
    {
      id: '01',
      title: 'UMN Apartment',
      description: 'Apartment for umn students',
      imageUrl: 'https://picsum.photos/300/',
      price : 500000
    },
    {
      id: '02',
      title: 'Serpong Apartment',
      description: 'Apartment for Serpong',
      imageUrl: 'https://picsum.photos/300/',
      price : 500000
    },
    {
      id: '03',
      title: 'JKT Apartment',
      description: 'Apartment for JKT',
      imageUrl: 'https://picsum.photos/300/',
      price : 500000
    }
  ];
  constructor() { }

  getAllPlace(){
    return [... this.places];
  }

  getPlace(id){
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.places.length; i++){
      if (this.places[i].id === id){
        return this.places[i];
      }
    }
  }
}
