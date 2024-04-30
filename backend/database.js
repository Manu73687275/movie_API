const Pool=require("pg").Pool;

const pool=new Pool({
    user:"your postgres_username",
    password:"your postgres_possword",
    host:"localhost",
    port:5432,
    database:"movie"
})

module.exports=pool

// table schema
// CREATE TABLE movie_data (
//     movie_name VARCHAR(250),
//     year_of_release INT,
//     multiple_genres VARCHAR(250),
//     multiple_actors VARCHAR(250),
//     technicians VARCHAR(250),
//     ratings INT,
//     director varchar(250)
// );
