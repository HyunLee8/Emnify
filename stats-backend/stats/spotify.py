import spotipy
from spotipy.oauth2 import SpotifyOAuth
from typing import List, Dict, Any

#===============================
#Basic Spotify API Interactions
#===============================

def get_spotify_client():
    
    scope = (
        'user-read-private'
        'playlist-read-private'
        'playlist-read-collaborative'
        'user-library-read'
    )
    
    return spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope))

def get_all_playlists(sp: spotipy.Spotify) -> List[Dict[str, Any]]: # need to wrap in List because spotify returns a JSON format
    playlists = [] 
    results = sp.current_user_playlists()
    
    while results:
        playlists.extend(results['items'])
        
        if results['next']:
            results = sp.next(results)
        else:
            break
    
    return playlists

def get_playlists_tracks(sp: spotipy.Spotify, playlist_id: str) -> List[Dict[str, any]]:
    tracks = []
    results = sp.playlist_tracks(playlist_id, limit=100)

    while results:
        tracks.extend(results['items'])

        if results['next']:
            results = sp.next(results)
        else:
            break
    
    return tracks

def get_all_tracks_from_playlists(sp: spotipy.Spotify, playlists: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    all_tracks = []
    
    for playlist in playlists:
        playlist_id = playlist['id']
        tracks = get_playlists_tracks(sp, playlist_id)
        all_tracks.extend(tracks)
    
    return all_tracks

def get_artist_id(tracks: List[Dict[str, Any]]) -> List[str]:
    ids = set()
    
    for item in tracks:
        track = item.get('track')
        if not track:
            continue
    
        for artist in track.get('artists', []):
            artist_id = artist.get('id')
            if artist_id:
                ids.add(artist_id)

    return list(ids)

def get_artists(sp: spotipy.Spotify) -> List[Dict[str, Any]]:
    artists = []
    batch_size = 50

    for i in range(0, len(artist_ids), batch_size):
        batch = artist_ids[i:i + batch_size]
        response = sp.artists(batch)
        artists.extend(response['artists'])

    return artists


