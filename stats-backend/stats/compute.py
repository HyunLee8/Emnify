from typing import List, Dict, Any
import spotipy
from .spotify import(
    get_spotify_client,
    get_all_playlists,
    get_all_tracks_from_playlists,
    get_artist_id,
    get_artists
)
from .genres import get_genres

client = get_spotify_client()
playlists = get_all_playlists(client)
tracks = get_all_tracks_from_playlists(client, playlists)
artist_ids = get_artist_id(tracks)

#==============================
#FOR COMPUTING ONLY
#==============================
# GENRES
genres = get_genres(client, artist_ids)


