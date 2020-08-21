import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  {
    path: 'main',
    loadChildren: () => import('src/app/modules/main-page/main-page.module').then(m => m.MainPageModule)
  },
  {
    path: 'favorite',
    loadChildren: () => import('src/app/modules/favorite-page/favorite-page.module').then(m => m.FavoritePageModule)
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
