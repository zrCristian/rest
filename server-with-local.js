import { createApp } from './app.js'
import { MovieModel } from './models/local-file-sytem/movies.js'

createApp({ movieModel: MovieModel })
