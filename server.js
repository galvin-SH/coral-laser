const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Initialize express
const PORT = process.env.PORT || 3001;
const app = express();
// Initialize mysql2
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        database: 'employee_db'
    },
    console.log(`connected to employee_db`)
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`san check port ${PORT}`);
})