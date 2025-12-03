from typing import List, Dict, Any
import spotipy
from .spotify import(
    get_spotify_client,
    get_all_playlists,
    get_all_tracks_from_playlists,
    get_artist_id,
    get_artists
)

client = get_spotify_client()
playlists = get_all_playlists(client)
tracks = get_all_tracks_from_playlists(client, playlists)
artist_ids = get_artist_id(tracks)

def get_genres(sp: spotipy, artists: List[Dict[str, Any]]) -> Dict[str, int]:
    genres = []
    result = sp.artists(artist_ids)
    for artist in result['artists']:
        genres.extend(artist['genres'])

    return genres