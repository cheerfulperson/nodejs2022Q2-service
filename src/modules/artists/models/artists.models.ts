export interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export interface ArtistDto {
  name: string;
  grammy: boolean;
}

export interface ArtistsResponse {
  items: Artist[];
  limit: number;
  offset: number;
  total: number;
}
