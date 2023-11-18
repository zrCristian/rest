import express from 'express'
import { MovieController } from '../controllers/movies.js'

export const createMovieRouter = ({ movieModel }) => {
    const moviesRouter = express.Router()

    const movieController = new MovieController({ movieModel })

    moviesRouter.get('/', movieController.getAll)

    moviesRouter.get('/:id', movieController.getById)

    moviesRouter.post('/', movieController.create)

    moviesRouter.put('/:id', movieController.update)

    moviesRouter.delete('/:id', movieController.delete)

    return moviesRouter
}

// export default moviesRouter
