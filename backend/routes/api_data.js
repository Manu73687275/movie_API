const pool = require("../database.js")
const zod = require("zod");


const add_validation = zod.object({
    name: zod.string(),
    year: zod.number(),
    geners: zod.string(),
    actors: zod.string(),
    technicians: zod.string(),
    ratings: zod.number(),
    director: zod.string()
})

const addmovie = async (req, res) => {
    try {
        const { success } = add_validation.safeParse(req.body)

        if (!success) {
            return res.status(411).json({
                msg: "giving wrong data"
            })
        }
        const name = req.body.name;
        const year = req.body.year;
        const geners = req.body.geners;
        const actors = req.body.actors;
        const technicians = req.body.technicians;
        const ratings = req.body.ratings;
        const director = req.body.director;
        const data = await pool.query("insert into movie_data(movie_name,year_of_release,multiple_genres,multiple_actors,technicians,ratings,director)values($1,$2,$3,$4,$5,$6,$7) returning *", [name, year, geners, actors, technicians, ratings, director]);
        return res.json(data.rows[0])


    } catch (error) {

        return res.json("this movie is already found")

    }
}

const getmovie = async (req, res) => {

    try {
        const searching_movie = req.query.search;

        const movie_data = await pool.query("select * from movie_data where movie_name=($1)", [searching_movie])

        if (movie_data.rows[0]) {
            return res.json(movie_data.rows[0])
        } else {
            return res.json("this movie is not found");
        }

    } catch (error) {
        res.json(error)

    }
}

const updatemoviename = async (req, res) => {
    try {
        const old_movie_name = req.query.oldmoviename;
        const new_movie_name = req.body.newmoviename;

        const check = await pool.query("select count(*) from movie_data where movie_name=($1)", [old_movie_name])
        const count = parseInt(check.rows[0].count)
        if (count > 0) {
            await pool.query("update movie_data set movie_name=($1) where movie_name=($2)", [new_movie_name, old_movie_name])
            return res.json({
                msg: "movie name updated successfully"
            })
        } else {
            return res.json("your currrent movie name is not found")
        }


    } catch (error) {

        return res.status(500).json("this movie name is already founded");
    }
}

const search_movie_based_actor = async (req, res) => {

    try {
        const actor = req.query.actor;
        const query = "SELECT * FROM movie_data WHERE multiple_actors LIKE $1";
        const data = await pool.query(query, [`%${actor}%`]);
        if (data.rows.length > 0) {
            const movieData = [];
            for (let i = 0; i < data.rows.length; i++) {
                const movie = data.rows[i];
                movieData.push({
                    movie_name: movie.movie_name,
                    year_of_release: movie.year_of_release,
                    multiple_genres: movie.multiple_genres,
                    multiple_actors: movie.multiple_actors,
                    technicians: movie.technicians,
                    ratings: movie.ratings,
                    director: movie.director
                })
            }
            res.json({ movieData })
        } else {
            return res.json({
                msg: "Movies with this actor are not found"
            });
        }
    } catch (error) {

        return res.status(500).json({ error: "Internal server error" });
    }

}


const search_movie_based_director = async (req, res) => {

    try {
        const director = req.query.director;

        const response = await pool.query("select * from movie_data where director=($1)", [director]);
        if (response.rows.length > 0) {
            const movieData = [];
            for (let i = 0; i < response.rows.length; i++) {
                const movie = response.rows[i];
                movieData.push({
                    movie_name: movie.movie_name,
                    year_of_release: movie.year_of_release,
                    multiple_genres: movie.multiple_genres,
                    multiple_actors: movie.multiple_actors,
                    technicians: movie.technicians,
                    ratings: movie.ratings,
                    director: movie.director
                })
            }
            res.json({ movieData })
        } else {
            return res.json({
                msg: "Movies with this director are not found"
            });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });

    }
}


const search_movie_based_technicians=async(req,res)=>{

    try {
        const technicians = req.query.technicians;

        const response = await pool.query("select * from movie_data where technicians=($1)", [technicians]);
        if (response.rows.length > 0) {
            const movieData = [];
            for (let i = 0; i < response.rows.length; i++) {
                const movie = response.rows[i];
                movieData.push({
                    movie_name: movie.movie_name,
                    year_of_release: movie.year_of_release,
                    multiple_genres: movie.multiple_genres,
                    multiple_actors: movie.multiple_actors,
                    technicians: movie.technicians,
                    ratings: movie.ratings,
                    director: movie.director
                })
            }
            res.json({ movieData })
        } else {
            return res.json({
                msg: "Movies with this technicians are not found"
            });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });

    }
}


module.exports = {
    addmovie,
    getmovie,
    updatemoviename,
    search_movie_based_actor,
    search_movie_based_director,
    search_movie_based_technicians
}