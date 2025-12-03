from typing import List, Dict, Any
from collections import Counter
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

#=============================
#FOR COMPUTING ONLY
#=============================


# Count each genre occurrence
genres = get_genres(client, artist_ids)
def compute_genre_percentages(genres) -> List[Dict[str, int]]:
    genre_counts = Counter(genres)
    return genre_counts



