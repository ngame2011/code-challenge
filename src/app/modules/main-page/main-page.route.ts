import { RouterModule } from '@angular/router';
import {MainPageComponent} from './components/main-page/main-page.component';

export const MainPageRouter = RouterModule.forChild([
  { path: '', component: MainPageComponent }
]);
