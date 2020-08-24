import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {AppState} from 'src/app/shared/app.interfaces';
import {searchQuerySelector} from 'src/app/selectors';
import {setPhotos, setSearchQuery} from 'src/app/actions';
import { FlickrService } from 'src/app/services/flickr.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit, OnDestroy {
  public searchString = '';

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
      .subscribe((query: string) => {
        this.searchString = query;
        this.searchByQuery(query);
      });

    this.flickrService.getSearchResult()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((photos) => {
        this.store$.dispatch(setPhotos({ photos }));
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  handleInput($event) {
    this.store$.dispatch(setSearchQuery({
      query: $event.target.value
    }));
  }

  private searchByQuery(query: string) {
    if (query.length > 2) {
      this.flickrService.search(query)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe();
    } else {
      this.flickrService.setSearchResult([]);
    }
  }
}
