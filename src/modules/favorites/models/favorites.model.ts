import { Album } from 'src/modules/albums/models/album.model';
import { Artist } from 'src/modules/artists/models/artists.models';
import { Track } from 'src/modules/tracks/models/tracks.model';

export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface FavoritesRepsonse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
