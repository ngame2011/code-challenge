import {AppConstants} from 'src/app/shared/app.constants';

export * from './interfaces/flickr.interfaces';

export interface SearchProvider {
  search(searchString: string);
}

export interface Photo {
  id: string;
  author: string;
  title: string;
  url: string;
  previewUrl?: string;
  alt?: string;
}

export interface Category {
  id: string;
  title: string;
  description?: string;
}

export interface PhotoToCategory {
  categoryId: string;
  photoId: string;
}

export interface AppReducer {
  searchProvider: string;
  searchQuery: string;
  photos: Photo[];
  categories: Category[];
  photoToCategory: PhotoToCategory[];
}

export interface AppState {
  app: AppReducer;
}
