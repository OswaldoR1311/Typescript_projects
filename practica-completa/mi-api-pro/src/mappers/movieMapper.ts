import type { OmdbResponse } from "../types/omdb.ts";
import type { Movie } from "../types/movie.ts";

export const mapOmdbToMovie = (omdbData: OmdbResponse): Movie => {
    return {
        id: omdbData.imdbID,
        title: omdbData.Title,
        year: Number(omdbData.Year),
        genres: omdbData.Genre ? omdbData.Genre.split(',').map(g => g.trim()) : [],
        director: omdbData.Director,
        synopsis: omdbData.Plot,
        poster: omdbData.Poster,
        imdbRating: Number(omdbData.imdbRating) || 0
    }
}