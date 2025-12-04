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

#gets the genres | dupes allowed
def get_genres(sp: spotipy) -> Dict[str, int]:
    genres = []
    result = sp.artists(artist_ids)
    for artist in result['artists']:
        genres.extend(artist['genres'])

    return genres

#gets counts for each genre
def compute_genre_counts(genres: List[str]) -> List[Dict[str, int]]:
    cleaned = [g.strip().lower() for g in genres if g.strip()]

    # Count occurrences
    counts = Counter(cleaned)

    # Convert to list of dicts (FastAPI-friendly)
    results = [
        {"name": genre, "count": count}
        for genre, count in counts.items()
    ]

    # Sort descending
    results.sort(key=lambda x: x["count"], reverse=True)

    return results
