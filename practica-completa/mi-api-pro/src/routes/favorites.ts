import { Router, type Request, type Response } from "express";
import { favoriteList } from "../data/favorites.ts";
import type { Movie } from "../types/movie.ts";
import type { OmdbResponse } from "../types/omdb.ts";
import { mapOmdbToMovie } from "../mappers/movieMapper.ts";
import { API_KEY } from "../constants.ts";

const router = Router()

interface AddFavoriteBody {
    movieId: string
}

interface FavoriteParams {
    id: string
}

router.get('/', (req: Request, res: Response<Movie[]>) => {
    return res.status(200).json(favoriteList)
})

router.post("/", async (req: Request<{}, {}, AddFavoriteBody>, res: Response<Movie | { error: string }>) => {
    try {
        const { movieId } = req.body
        if (!movieId) {
            return res.status(400).json({ error: 'movieId is required' })
        }

        const alreadyExists = favoriteList.some(m => m.id === movieId)
        if (alreadyExists) {
            return res.status(409).json({ error: 'movie is already in favorites' })
        }

        const response = await fetch(`https://www.omdbapi.com/?i=${movieId}&apiKey=${API_KEY}`)

        if (!response.ok) {
            return res.status(502).json({ error: 'Failed to fetch movie' })
        }

        const rawData = await response.json() as OmdbResponse

        if (rawData.Response === 'False') {
            return res.status(404).json({ error: 'Movie not found in external provider' })
        }

        const movie = mapOmdbToMovie(rawData)

        favoriteList.push(movie)

        return res.status(201).json(movie)
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
})

router.delete("/:id", (req: Request<FavoriteParams>, res: Response<{ message: string } | { error: string }>) => {
    const { id } = req.params
    const movieIndex = favoriteList.findIndex(m => m.id === id)
    if (movieIndex === -1) {
        return res.status(404).json({ error: 'Movie not found in favorites' })
    }

    favoriteList.splice(movieIndex, 1)
    return res.status(200).json({ message: 'Movie removed from favorites' })
})

export default router