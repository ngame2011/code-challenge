import {Action, createReducer, on} from '@ngrx/store';
import {AppReducer} from 'src/app/shared/app.interfaces';
import {setCategories} from 'src/app/actions';

export const initialState: AppReducer = {
  categories: [],
};

const reducer = createReducer(initialState,
  on(setCategories, (state, {categories}) => ({
    ...state,
    categories
  }))
);

export function appReducer(state: AppReducer, action: Action) {
  return reducer(state, action);
}
