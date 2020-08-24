import {Action, createReducer, on} from '@ngrx/store';
import {AppReducer} from 'src/app/shared/app.interfaces';
import {addCategory, addPhotoToCategory, setCategories, setPhotos, setSearchProvider, setSearchQuery} from 'src/app/actions';
import {environment} from 'src/environments/environment';

export const initialState: AppReducer = {
  searchProvider: environment.defaultSearchProvider,
  searchQuery: '',
  photos: [],
  categories: [],
  photoToCategory: []
};

const reducer = createReducer(initialState,
  on(setCategories, (state, { categories }) => ({
    ...state,
    categories
  })),
  on(addCategory, (state, { category }) => ({
    ...state,
    categories: [...state.categories, category]
  })),
  on(setSearchProvider, (state, { provider }) => ({
    ...state,
    searchProvider: provider
  })),
  on(setSearchQuery, (state, { query }) => ({
    ...state,
    searchQuery: query
  })),
  on(setPhotos, (state, { photos }) => ({
    ...state,
    photos
  })),
  on(addPhotoToCategory, (state, { categoryId, photoId }) => ({
    ...state,
    photoToCategory: [ ...state.photoToCategory, { categoryId, photoId }]
  }))
);

export function appReducer(state: AppReducer, action: Action) {
  return reducer(state, action);
}
