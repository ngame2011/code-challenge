import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

import { environment } from 'src/environments/environment';
import {FlickrAPIResponse, Photo, SearchProvider} from 'src/app/shared/app.interfaces';

@Injectable({
  providedIn: 'root'
})
export class FlickrService implements SearchProvider {
  private endpointUrl = 'https://www.flickr.com/services/rest';
  private authorEndpointUrl = 'https://www.flickr.com/photos';

  private searchResult$ = new BehaviorSubject<Photo[]>([]);

  constructor(private http: HttpClient) {}

  setSearchResult(value: Photo[]) {
    this.searchResult$.next(value);
  }

  getSearchResult() {
    return this.searchResult$.asObservable();
  }

  search(searchString: string) {
    return this.http.get<FlickrAPIResponse>(this.endpointUrl, {
      params: {
        per_page: '30',
        api_key: environment.flickrApiKey,
        text: searchString,
        method: 'flickr.photos.search',
        format: 'json',
        nojsoncallback: '1',
        tag_mode: 'all',
        media: 'photos',
        extras: 'owner_name,url_q,url_l',
      }
    }).pipe(
      debounceTime(900),
      distinctUntilChanged(),
      tap((data) => {
        this.setSearchResult(data.photos.photo.map(item => ({
          id: uuidv4(),
          author: `${this.authorEndpointUrl}/${item.owner}`,
          title: item.title,
          url: item.url_l,
          previewUrl: item.url_q
        })));
      })
    );
  }
}
