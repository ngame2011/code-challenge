import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {select, Store} from '@ngrx/store';
import {Subject} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {AppState, Category, Photo} from 'src/app/shared/app.interfaces';
import {categoriesSelector} from 'src/app/selectors';
import {addCategory, addPhotoToCategory} from 'src/app/actions';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-add-to-favorite',
  templateUrl: './add-to-favorite.component.html',
  styleUrls: ['./add-to-favorite.component.css']
})
export class AddToFavoriteComponent implements OnInit, OnDestroy {
  @Input() photo: Photo;
  public categories: Category[];
  public categoryTitle = '';

  private unsubscribe$ = new Subject();

  constructor(
    private modalService: NgbModal,
    private store$: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.store$
      .pipe(
        takeUntil(this.unsubscribe$),
        select(categoriesSelector)
      )
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  handleInput($event) {
    this.categoryTitle = $event.target.value;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  addToFavorite($event) {
    $event.preventDefault();

    let category = this.categories.find(
      ({title}) => title === this.categoryTitle
    );

    if (!category) {
      category = this.createCategory();
    }

    this.store$.dispatch(addPhotoToCategory({
      categoryId: category.id,
      photoId: this.photo.id
    }));

    this.categoryTitle = '';
    this.modalService.dismissAll();
  }

  private createCategory() {
    const category = {
      id: uuidv4(),
      title: this.categoryTitle,
    };

    this.store$.dispatch(addCategory({
      category
    }));

    return category;
  }
}
