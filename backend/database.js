const Pool=require("pg").Pool;

const pool=new Pool({
    user:"postgres",
    password:"Manu@123",
    host:"localhost",
    port:5432,
    database:"movie"
})

module.exports=pool

