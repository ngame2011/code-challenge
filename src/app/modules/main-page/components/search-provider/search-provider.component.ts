import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppConstants} from 'src/app/shared/app.constants';
import {select, Store} from '@ngrx/store';
import {AppState} from 'src/app/shared/app.interfaces';
import {searchProviderSelector} from 'src/app/selectors';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {setSearchProvider} from 'src/app/actions';

@Component({
  selector: 'app-search-provider',
  templateUrl: './search-provider.component.html',
  styleUrls: ['./search-provider.component.css']
})
export class SearchProviderComponent implements OnInit, OnDestroy {
  currentProvider;
  providerList = [
    AppConstants.FlickrProvider,
    AppConstants.UnsplashProvider
  ];

  private unsubscribe$ = new Subject();

  constructor(private store$: Store<AppState>) {}

  ngOnInit() {
    this.store$
      .pipe(
        takeUntil(this.unsubscribe$),
        select(searchProviderSelector)
      )
      .subscribe((provider) => {
        this.currentProvider = provider || this.providerList[0];
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setProvider(provider: string) {
    this.store$.dispatch(setSearchProvider({ provider }));
  }
}
