import spotipy
from spotipy.oauth2 import SpotifyOAuth
from typing import List, Dict, Any

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
    results = sp.playlist





