import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MainPageRouter } from './main-page.route';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SearchProviderComponent } from './components/search-provider/search-provider.component';
import { AddToFavoriteComponent } from './components/add-to-favorite/add-to-favorite.component';

@NgModule({
  declarations: [
    MainPageComponent,
    SearchInputComponent,
    SearchResultComponent,
    SearchProviderComponent,
    AddToFavoriteComponent
  ],
  imports: [
    CommonModule, MainPageRouter, NgbModalModule
  ]
})
export class MainPageModule { }
