const express = require("express");
const router = express.Router();

const { addmovie,
    getmovie,
    updatemoviename,
    search_movie_based_actor,
    search_movie_based_director,
    search_movie_based_technicians } = require("./api_data.js")

router.use(express.json());



router.post("/add", addmovie);

router.get("/particular_movie", getmovie);

router.put("/update-movie-name", updatemoviename);

router.get("/search_actor_movies", search_movie_based_actor);

router.get("/serach_director_movies", search_movie_based_director);

router.get("/search_technicians_movies",search_movie_based_technicians)



module.exports = router;