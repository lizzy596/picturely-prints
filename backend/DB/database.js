const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql");



const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


module.exports = db





