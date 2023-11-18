import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'movies_node'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
    static getAll = async({ genre }) => {
        // if (genre) {
        //     const lowerCaseGenre = genre.toLowerCase()

        //     const [genres] = await connection.query(`SELECT title, year, director, duration rate, genre_id, name FROM movie
        //     inner join movie_genres on movie.id = movie_id
        //     inner join genre on genre.id = genre_id
        //     where name like ?;`, [lowerCaseGenre]) // where LOWER(name) = lowerCaseGenre

        //     console.log(genres)
        //     return genres
        // }

        if (genre) {
            const lowerCaseGenre = genre.toLowerCase()

            const [genres] = await connection.query(`SELECT id, name FROM genre
            where name like ?;`, [lowerCaseGenre]) // where LOWER(name) = lowerCaseGenre

            console.log('Que generos hay')
            console.log(genres)
            // return genres

            if (genres.length === 0) return []

            const [{ id }] = genres

            console.log({ id_pelicualas: id })

            const [movieGenres] = await connection.query(`SELECT title, year, director, duration, poster, rate, genre_id, name FROM movie_genres
            INNER JOIN movie on movie_id = movie.id
            INNER JOIN genre on genre_id = ${id}
            where name like ?;`, [lowerCaseGenre]
            )

            console.log('Listado de:')
            console.log(movieGenres)
            return movieGenres
        }

        const [movies] = await connection.query(
            'SELECT id, title year, director, duration, poster, rate FROM movie;'
        )
        return movies
    }

    static async getById({ id }) {
        const [movie] = await connection.query(`SELECT id, title year, director, duration, poster, rate  FROM movie
            WHERE id = ?;`, [id])

        if (movie.length === 0) return null
        return movie[0]
    }

    static async create({ input }) {
        const { title, year, director, duration, poster, rate } = input

        const [uuidResult] = await connection.query('SELECT UUID() uuid;')
        const [{ uuid }] = uuidResult

        try {
            await connection.query(`INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES
            ("${uuid}", ?, ?, ?, ?, ?, ?);`,
            [title, year, director, duration, poster, rate]
            )
        } catch (e) {
            throw new Error('Error creating movie')
        }

        const [movies] = await connection.query(`SELECT id, title, year, director, duration, poster, rate FROM movie
        WHERE id = ?;`,
        [uuid]
        )

        return movies[0]
    }

    static async update({ id, input }) {
        const { title, year, director, duration, poster, rate } = input
        console.log(input)
        console.log(id)

        const [result] = await connection.query(`UPDATE movie SET 
        title =  ?,
        year = ?, 
        director = ?, 
        duration= ?, 
        poster = ?, 
        rate = ?
        where id = ?;`, [title, year, director, duration, poster, rate, id])
        console.log(result)
        return result
    }

    static async delete({ id }) {
        const [result] = await connection.query('delete from movie where id = ?;', [id])
        console.log(result)
        return result
    }
}
