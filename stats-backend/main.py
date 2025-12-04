from fastapi import FastAPI
from stats.spotify import get_spotify_client
from stats.compute import get_genres
import spotipy

app = FastAPI()

@app.get('/')
def root():
    return {"Hello" : "World"}

@app.get('/genres')
def genre-count():
    client = get_spotify_client()
    genres = get_genres(client)
    counts, total = compute_genre_counts(genres)
    return {
        "genres": counts,
         "total": total
    }
    


