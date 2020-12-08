import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'students1',
    loadChildren: () => import('./week8/students1/students1.module').then( m => m.Students1PageModule)
  },
  {
    path: 'students2',
    loadChildren: () => import('./week8/students2/students2.module').then( m => m.Students2PageModule)
  },
  {
    path: 'students3',
    loadChildren: () => import('./week8/students3/students3.module').then( m => m.Students3PageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./week8/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'index',
    loadChildren: () => import('./week9/index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'insert',
    loadChildren: () => import('./week9/insert/insert.module').then( m => m.InsertPageModule)
  },
  {
    path: 'week10/index',
    loadChildren: () => import('./week10/index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'week10/create',
    loadChildren: () => import('./week10/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'week10/edit/:key',
    loadChildren: () => import('./week10/edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'display-map/:key',
    loadChildren: () => import('./display-map/display-map.module').then( m => m.DisplayMapPageModule)
  },
  {
    path: 'current-loc',
    loadChildren: () => import('./current-loc/current-loc.module').then( m => m.CurrentLocPageModule)
  },
  {
    path: 'loc-coordinate',
    loadChildren: () => import('./loc-coordinate/loc-coordinate.module').then( m => m.LocCoordinatePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
