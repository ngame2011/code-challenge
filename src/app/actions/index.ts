import {createAction, props} from '@ngrx/store';
import {Category, Photo} from 'src/app/shared/app.interfaces';

export const setSearchProvider = createAction(
  'SearchProvider::set',
  props<{ provider: string }>()
);

export const setSearchQuery = createAction(
  'SearchQuery::set',
  props<{ query: string }>()
);

export const setCategories = createAction(
  'Categories::set',
  props<{ categories: Category[] }>()
);

export const addCategory = createAction(
  'Category::add',
  props<{ category: Category }>()
);

export const setPhotos = createAction(
  'Photos::set',
  props<{ photos: Photo[] }>()
);

export const addPhotoToCategory = createAction(
  'PhotoToCategory::add',
  props<{ categoryId: string, photoId: string }>()
);
