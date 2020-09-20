import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlacesPage } from './places.page';
import {DiscoverPage} from '../discover/discover.page';
import {OfferPage} from '../offer/offer.page';
import {DiscoverPageModule} from '../discover/discover.module';
import {OfferPageModule} from '../offer/offer.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/places/tabs/discover',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    component: PlacesPage,
    children: [
      {
        path: 'discover',
        loadChildren: () => import('../discover/discover.module').then(m => DiscoverPageModule )
      },
      {
        path: 'offer',
        loadChildren: () => import('../offer/offer.module').then(m => OfferPageModule )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacesPageRoutingModule {}
