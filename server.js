const inquirer = require('inquirer');
const mysql = require('mysql2');

// Initialize mysql2
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        database: 'employee_db'
    },
    console.log(`connected to employee_db`)
);

db.query('DESCRIBE employee', (err, data) => {
    if (err) { console.error(err) }
    else { console.table(data) }
})