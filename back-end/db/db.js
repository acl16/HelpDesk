const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost',      
    user: 'root',           
    password: '',           
    database: 'help_desk'   
});


module.exports = connection;
