import {createAction, props} from '@ngrx/store';
import {Category} from 'src/app/shared/app.interfaces';

export const setCategories = createAction(
  'Categories::set',
  props<{ categories: Category[] }>()
);
