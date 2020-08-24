import {createSelector, createFeatureSelector} from '@ngrx/store';
import {AppReducer, AppState} from 'src/app/shared/app.interfaces';

const selectAppState = createFeatureSelector<AppState, AppReducer>('app');

export const searchProviderSelector = createSelector(
  selectAppState,
  (state) => state.searchProvider
);

export const searchQuerySelector = createSelector(
  selectAppState,
  (state) => state.searchQuery
);

export const categoriesSelector = createSelector(
  selectAppState,
  (state) => state.categories
);

export const photosSelector = createSelector(
  selectAppState,
  (state) => state.photos
);

export const photoToCategory = createSelector(
  selectAppState,
  (state) => state.photoToCategory
)
