import express from 'express'
import moviesRouter from './routes/movies.ts'
import favoritesRouter from './routes/favorites.ts'
import { authMiddleware } from './middlewares/auth.ts'


const app = express()
app.use(express.json())

const PORT = 4000

app.use("/movies", moviesRouter)
app.use("/favorites", authMiddleware, favoritesRouter)



app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))

