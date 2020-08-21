import {ActionReducerMap} from '@ngrx/store';
import {appReducer} from 'src/app/reducers/app.reducer';
import {AppState} from 'src/app/shared/app.interfaces';

export const reducers: ActionReducerMap<AppState> = {
  app: appReducer
};
