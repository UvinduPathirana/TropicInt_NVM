const mysql = require("mysql");

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Uv1ndu2006',
    database: 'tropicint',
    multipleStatements: true
});

module.exports = connection;
