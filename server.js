const inquirer = require('inquirer');
const mysql = require('mysql2');
require("dotenv").config();

// Initialize mysql2
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        database: process.env.DB_NAME
    },
    console.log(`mysql2 connected to database`)
);

function prompt() {
    const question =
        [{
            name: 'selection',
            message: 'What would you like to do?',
            type: 'list',
            choices: ['VIEW departments', 'VIEW roles', 'VIEW employees', 'ADD department', 'ADD role', 'ADD employee', 'UPDATE employee role']
        }];
    inquirer.prompt(question)
        .then((answer) => {
            switch (answer.selection) {
                case 'VIEW departments':
                    db.query('SELECT * FROM department', (err, data) => {
                        if (err) { console.error(err) }
                        else { console.table(data) }
                        prompt();
                    });
                    break;
                case 'VIEW roles':
                    db.query(
                        `SELECT title, role.id AS role_id, name AS department, salary
                        FROM role
                        LEFT JOIN department
                        ON role.department_id = department.id;`,
                        (err, data) => {
                            if (err) { console.error(err) }
                            else { console.table(data) }
                            prompt();
                        });
                    break;
                case 'VIEW employees':
                    db.query(
                        `SELECT employee.id, employee.first_name, employee.last_name, title, name AS department, salary, manager.last_name AS manager
                        FROM employee
                        LEFT JOIN role
                        ON employee.role_id = role.id
                        LEFT JOIN department
                        ON role.department_id = department.id
                        LEFT JOIN employee AS manager
                        ON employee.manager_id = manager.id;`,
                        (err, data) => {
                            if (err) { console.error(err) }
                            else { console.table(data) }
                            prompt();
                        });
                    break;
                case 'ADD department':
                    addDepartment();
                    break;
                case 'ADD role':
                    addRole();
                    break;
                case 'ADD employee':
                    addEmployee();
                    break;
                case 'UPDATE employee role':
                    updateEmployeeRole();
                    break;
            }
        })
};

function addDepartment() {
    const question =
        [{
            name: 'name',
            message: 'What is the department name?',
            type: 'input',
        }]
    inquirer.prompt(question)
        .then((answer) => {
            db.query(`INSERT INTO department SET ?`,
                { name: answer.name },
            )
        })
        .then(() => {
            prompt();
        })
};
function addRole() {
    const question =
        [{
            name: 'title',
            message: 'What is the role title?',
            type: 'input',
        },
        {
            name: 'salary',
            message: 'What is the role salary?',
            type: 'input'
        },
        {
            name: 'department_id',
            message: 'What is the department id?',
            type: 'input'
        }]
    inquirer.prompt(question)
        .then((answer) => {
            db.query(`INSERT INTO role SET ?`,
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id
                },
            )
        })
        .then(() => {
            prompt();
        })
};
function addEmployee() {
    const question =
        [{
            name: 'first_name',
            message: 'What is the employee first name?',
            type: 'input',
        },
        {
            name: 'last_name',
            message: 'What is the employee last name?',
            type: 'input'
        },
        {
            name: 'role_id',
            message: 'What is the employee role id?',
            type: 'input'
        },
        {
            name: 'manager_id',
            message: 'What is the employee manager id?',
            type: 'input'
        }]
    inquirer.prompt(question)
        .then((answer) => {
            db.query(`INSERT INTO employee SET ?`,
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                    manager_id: answer.manager_id
                },
            )
        })
        .then(() => {
            prompt();
        })
};
function updateEmployeeRole() {
    db.query('SELECT first_name, last_name FROM employee', ((err, data) => {
        if (err) { console.error(err) }
        else {
            const choices = [];
            for (i = 0; i < data.length; i++) {
                choices.push(`${data[i].first_name} ${data[i].last_name}`)
            }
            const firstQuestion =
                [{
                    name: 'selection',
                    message: 'which employee will be updated?',
                    type: 'list',
                    choices: choices
                }]
            inquirer.prompt(firstQuestion)
                .then((answer) => {
                    console.log(answer.selection)
                })
        }
    }))
};

prompt();