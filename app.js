const inquirer = require("inquirer");
const db = require("./config/connection.js");

const { viewAllDepartments, addDepartment } = require("./controllers/departmentController.js");


db.authenticate().then(() => {
    console.log("Database connected...");
    runApp()
}).catch(err => console.log("Error: " + err));


function runApp() {
inquirer
    .prompt([
        {
            type: "list",
            message: "Please select one from below:",
            choices: [
                "View All Employees",,
                "Add Employee",
                "View All Roles",
                "Add Role",
                "Update Employee Role",
                "View All Departments",
                "Add Department"
            ],
            name: "start",
        },

    ]).then((answer) => {
        switch (answer.start) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add Role":
                addRole();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "View All Departments":
                viewAllDepartments();
                break;
            case "Add Department":
                addDepartment();
                break;
        }
    });
}

runApp();