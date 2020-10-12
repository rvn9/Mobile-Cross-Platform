import { Injectable } from '@angular/core';
import {Place} from './places.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private places: Place[] = [
    {
      placeId: 'p1',
      title: 'UMN Apartment',
      description: 'Ini apartment UMN',
      imageUrl: 'https://www.jual-apartemen.com/images3/26432_4.jpg?1542182660',
      price: 111
    }, {
      placeId: 'p2',
      title: 'Serpong Apartment',
      description: 'Ini apartment Serpong',
      imageUrl: 'https://www.summareconbekasi.com/public/images/gallery/article/5607/Serpong-M-Town-Gallery-4.jpg',
      price: 222
    }, {
      placeId: 'p3',
      title: 'JKT Apartment',
      description: 'Ini apartment Jakarta',
      imageUrl: 'https://photosrp.dotproperty.id/2.0-ID-1346523-PP-4644122-20276713515e3815f547bfa-1-490-325-tr1580724896/apartemen-dijual-dengan-1-kamar-tidur-di-pondok-indah-real-estate-jakarta-selatan-jakarta.jpg',
      price: 333
    }
  ];

  constructor() { }
  getAllPlaces(){
    return [...this.places];
  }
  getPlace(placeId: string){
    return {...this.places.find(place => {
        return place.placeId === placeId;
      })};
  }
  deletePlace(placeId: string){
    this.places = this.places.filter(place => {
      return place.placeId !== placeId;
    });
  }
}
