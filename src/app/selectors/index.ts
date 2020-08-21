import {createSelector, createFeatureSelector} from '@ngrx/store';
import {AppReducer, AppState} from 'src/app/shared/app.interfaces';

const selectAppState = createFeatureSelector<AppState, AppReducer>('app');

export const categoriesSelector = createSelector(
  selectAppState,
  (state) => state.categories
);
