import {Component, OnDestroy, OnInit} from '@angular/core';
import { FlickrService } from 'src/app/services/flickr.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit, OnDestroy {
  public searchString = '';

  private unsubscribe$ = new Subject();

  constructor(private flickrService: FlickrService) { }

  ngOnInit() {
    this.flickrService.getSearchResult()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  handleInput($event) {
    const searchString = $event.target.value;

    this.flickrService.search(searchString)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }
}
