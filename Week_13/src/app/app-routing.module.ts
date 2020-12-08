import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'contactindex',
    pathMatch: 'full'
  },
  {
    path: 'index',
    loadChildren: () => import('./week10/index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./week10/create/create.module').then( m => m.CreatePageModule)
  },  
  {
    path: 'contactindex',
    loadChildren: () => import('./contact/contactindex/contactindex.module').then( m => m.ContactindexPageModule)
  }, 
  {
    path: 'contactcreate',
    loadChildren: () => import('./contact/contactcreate/contactcreate.module').then( m => m.ContactcreatePageModule)
  }, 
  {
    path: ':contactKey',
    loadChildren: () => import('./contact/contactedit/contactedit.module').then( m => m.ContacteditPageModule)
  },
   {
    path: ':studentKey',
    loadChildren: () => import('./week10/edit/edit.module').then( m => m.EditPageModule)
  },


 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
