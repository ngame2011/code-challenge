import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FlickrService} from 'src/app/services/flickr.service';
import {takeUntil} from 'rxjs/operators';
import {AppState, Photo} from 'src/app/shared/app.interfaces';
import {select, Store} from '@ngrx/store';
import {searchQuerySelector} from 'src/app/selectors';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {
  searchResult: Photo[] = [];
  searchQuery = '';

  private unsubscribe$ = new Subject();

  constructor(
    private flickrService: FlickrService,
    private store$: Store<AppState>
  ) {}

  ngOnInit() {
    this.store$
      .pipe(
        takeUntil(this.unsubscribe$),
        select(searchQuerySelector)
      )
      .subscribe(query => {
        this.searchQuery = query;
      });

    this.flickrService.getSearchResult()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.searchResult = data;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
