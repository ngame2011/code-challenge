import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritePageComponent } from './components/favorite-page/favorite-page.component';
import { FavoritePageRouter } from './favorite-page.route';



@NgModule({
  declarations: [FavoritePageComponent],
  imports: [
    CommonModule, FavoritePageRouter
  ]
})
export class FavoritePageModule { }
