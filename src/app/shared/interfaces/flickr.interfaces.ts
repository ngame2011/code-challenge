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
