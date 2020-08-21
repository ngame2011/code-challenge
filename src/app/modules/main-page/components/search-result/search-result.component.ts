import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FlickrService} from 'src/app/services/flickr.service';
import {takeUntil} from 'rxjs/operators';
import {Photo} from 'src/app/shared/app.interfaces';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {
  searchResult: Photo[] = [];

  private unsubscribe$ = new Subject();

  constructor(private flickrService: FlickrService) {}

  ngOnInit() {
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
