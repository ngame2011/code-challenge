import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState, Category, Photo, PhotoToCategory} from 'src/app/shared/app.interfaces';
import {takeUntil} from 'rxjs/operators';
import {categoriesSelector, photosSelector, photoToCategory} from 'src/app/selectors';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.css']
})
export class FavoritePageComponent implements OnInit, OnDestroy {
  categories$: Observable<Category[]>;
  photoToCategory$: Observable<PhotoToCategory[]>;
  photos: Photo[];

  private unsubscribe$ = new Subject();

  constructor(
    private store$: Store<AppState>
  ) { }

  ngOnInit() {
    this.categories$ = this.store$.pipe(
      takeUntil(this.unsubscribe$),
      select(categoriesSelector)
    );

    this.photoToCategory$ = this.store$.pipe(
      takeUntil(this.unsubscribe$),
      select(photoToCategory)
    );

    this.store$.pipe(
      takeUntil(this.unsubscribe$),
      select(photosSelector)
    ).subscribe((photos) => {
      this.photos = photos;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
