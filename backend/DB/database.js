const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql");







/*const db = mysql.createConnection({
  user: DB_USER,
  host: DB_HOST,
  password:DB_PASSWORD,
  database:DB_NAME,
}); */





const db = mysql.createConnection({
  user: process.env.DB_USER1,
  host: process.env.DB_HOST1,
  password: process.env.DB_PASSWORD1,
  database: process.env.DB_NAME1
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


module.exports = db






