const express = require('express');
const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const app = express();
require('dotenv').config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const db = mysql2.createConnection (
  {
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'employee_manager_db'
  },
  console.log(`You are now connected to the employee_manager_db database. \n\n 
  Welcome to the Employee Tracker. \n`)
);

function homeScreen() {
  inquirer.prompt([
    {
        type: 'list',
        name: 'dbTables',
        choices: ['View all departments', 
                  'View all roles', 
                  'View all employees', 
                  'Add a department', 
                  'Add a role', 
                  'Add an employee', 
                  'Update an employee role'],
    },
  ]).then(({ dbTables }) => {
    switch (dbTables) {
      case 'View all departments':
        viewDepts();
        break;
      case 'View all roles':
        viewRoles();
        break;
      case 'View all employees':
        viewEmployees();
        break;
      case 'Add a department':
        addDept();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        return;
    }
  });
};
