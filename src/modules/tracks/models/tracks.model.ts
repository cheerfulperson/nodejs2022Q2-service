export interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export type TrackDto = Omit<Track, 'id'>;

export interface TracksResponse {
  items: Track[];
  limit: number;
  offset: number;
  total: number;
}
