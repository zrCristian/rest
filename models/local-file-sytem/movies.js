import { createRequire } from 'node:module'
import { randomUUID } from 'node:crypto'

const require = createRequire(import.meta.url)
const movies = require('../../movies.json')
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

export class MovieModel {
    static getAll = async({ genre }) => {
        if (genre) {
            const filteredMovies = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
            return filteredMovies
        }

        return movies
    }

    static async getById({ id }) {
        const movie = movies.find(movie => movie.id == id)
        return movie
    }

    static async create({ input }) {
        const newMovie = {
            id: randomUUID(),
            ...input
        }

        movies.push(newMovie)
        return newMovie
    }

    static async update({ id, input }) {
        const movieIndex = movies.findIndex(m => m.id == id)

        if (movieIndex === -1) return false

        movies[movieIndex] = {
            ...movies[movieIndex],
            ...input
        }

        return movies[movieIndex]
    }

    static async delete({ id }) {
        const movieIndex = movies.findIndex(movie => movie.id === id)

        if (movieIndex === -1) return false

        movies.splice(movieIndex, 1)
        return true
    }
}
