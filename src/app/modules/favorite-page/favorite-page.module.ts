import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritePageComponent } from './components/favorite-page/favorite-page.component';
import { FavoritePageRouter } from './favorite-page.route';
import { PhotoToCategoryPipe } from './photo-to-category.pipe';



@NgModule({
  declarations: [FavoritePageComponent, PhotoToCategoryPipe],
  imports: [
    CommonModule, FavoritePageRouter
  ]
})
export class FavoritePageModule { }
