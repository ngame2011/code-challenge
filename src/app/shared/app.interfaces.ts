export interface SearchProvider {
  search(searchString: string);
}

interface FlickrApiPhoto {
  id: string;
  title: string;
  owner: string;
  farm: number;
  secret: string;
  server: string;
  url_q: string;
  url_l: string;
}

export interface FlickrAPIResponse {
  photos: {
    photo: FlickrApiPhoto[];
  };
}

export interface Photo {
  author: string;
  title: string;
  url: string;
  previewUrl?: string;
  alt?: string;
}

export interface Category {
  title: string;
  photos: Photo[];
  description?: string;
}

export interface AppReducer {
  categories: Category[];
}

export interface AppState {
  app: AppReducer;
}
