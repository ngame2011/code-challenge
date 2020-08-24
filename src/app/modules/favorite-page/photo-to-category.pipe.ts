import { Pipe, PipeTransform } from '@angular/core';
import {Category, PhotoToCategory} from 'src/app/shared/app.interfaces';

@Pipe({
  name: 'photoToCategory'
})
export class PhotoToCategoryPipe implements PipeTransform {
  transform(value: PhotoToCategory[], category: Category): PhotoToCategory[] {
    return value.filter(({ categoryId }) => categoryId === category.id);
  }
}
