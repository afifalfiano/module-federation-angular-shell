import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { environment } from '../environments/environment';
let URL = '';
if(!environment.production) {
  URL = 'http://localhost:3000/remoteEntry.js';
} else {
  URL = 'https://module-federation-angular-mfe1.vercel.app/remoteEntry.js';
}

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'products',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: URL,
        exposedModule: './Module'
      })
      .then(m => m.ProductsModule)
  },
  // {
  //   path: 'products',
  //   loadChildren: () => import('mfe1/Module').then(m => m.ProductsModule)
  // },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
