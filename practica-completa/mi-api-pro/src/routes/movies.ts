import express from 'express'
import type { Request, Response } from 'express'
import type { OmdbResponse } from '../types/omdb.ts'
import type { Movie } from '../types/movie.ts'
import { mapOmdbToMovie } from '../mappers/movieMapper.ts'
import { API_KEY } from '../constants.ts'

const router = express.Router()
interface movieParams { id: string }
interface Error { error: string }

router.get("/", (req, res) => {
    res.send('Hola mundo, obteniendo peliculas')
})

router.get("/:id", async (req: Request<movieParams>, res: Response<Movie | Error>) => {
    try {
        const { id } = req.params
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)

        if (!response.ok) {
            return res.status(502).json({ error: 'External API service unavailable' })
        }

        const rawData = await response.json() as OmdbResponse

        if (rawData.Response === 'False') {
            return res.status(404).json({ error: 'Movie not found' })
        }

        const movie = mapOmdbToMovie(rawData)
        return res.status(200).json(movie)
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
})

export default router