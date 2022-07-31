export interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export type AlbumDto = Omit<Album, 'id'>;

export interface AlbumsResponse {
  items: Album[];
  limit: number;
  offset: number;
  total: number;
}
