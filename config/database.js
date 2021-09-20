const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Uv1ndu2006',
    database: 'tropicint'
});

module.exports = {
    connection
}