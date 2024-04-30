const express = require("express");
const cors = require("cors");
const moviedata = require("./routes/movie_api.js");
const port=3000;
const app = express();


app.use(cors());

app.use("/movie", moviedata);


app.listen(port, function () {
    console.log("server is on");
})