import {RouterModule} from '@angular/router';
import {FavoritePageComponent} from './components/favorite-page/favorite-page.component';

export const FavoritePageRouter = RouterModule.forChild([
  { path: '', component: FavoritePageComponent}
]);
