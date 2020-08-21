import {Component, Input, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {select, Store} from '@ngrx/store';
import {AppState, Category, Photo} from 'src/app/shared/app.interfaces';
import {Observable} from 'rxjs';
import {categoriesSelector} from 'src/app/selectors';
import {setCategories} from 'src/app/actions';

@Component({
  selector: 'app-add-to-favorite',
  templateUrl: './add-to-favorite.component.html',
  styleUrls: ['./add-to-favorite.component.css']
})
export class AddToFavoriteComponent implements OnInit {
  @Input() photo: Photo;
  public categories$: Observable<Category[]>;

  public categoryTitle = '';

  constructor(private modalService: NgbModal, private store$: Store<AppState>) { }

  ngOnInit() {
    this.categories$ = this.store$.pipe(select(categoriesSelector));
  }

  handleInput($event) {
    this.categoryTitle = $event.target.value;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  addToFavorite($event) {
    $event.preventDefault();

    this.store$.dispatch(setCategories({
      categories: [{
        title: this.categoryTitle,
        photos: [this.photo]
      }]
    }));

    this.categoryTitle = '';
    this.modalService.dismissAll();
  }
}
