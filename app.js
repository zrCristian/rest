import express, { json } from 'express'
import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

export const createApp = ({ movieModel }) => {
    const app = express()

    app.use(json())
    app.use(corsMiddleware)

    // Todos los Recursos que sean MOVIES se identifican con /movies
    app.use('/movies', createMovieRouter({ movieModel }))

    const PORT = process.env.PORT ?? 3000

    app.listen(PORT, () => console.log(`[SERVER] running on port ${PORT}`))
}
