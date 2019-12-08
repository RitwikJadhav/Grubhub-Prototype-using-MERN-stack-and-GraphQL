var mysql = require("mysql");
var pool = mysql.createPool({
    connectionLimit : 1000,
    port : "3306",
    host: "localhost",
    user : "root",
    password : "ritwik",
    database : "grubhub"
});

module.exports = pool;