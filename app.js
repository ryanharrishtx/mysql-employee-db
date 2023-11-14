const inquirer = require("inquirer");
const db = require("./config/connection.js");

const { viewAllDepartments, addDepartment } = require("./controllers/departmentsController.js");
const { viewAllEmployees, addEmployee, updateEmployeeRole } = require("./controllers/employeesController.js");
const { viewAllRoles, addRole } = require("./controllers/rolesController.js");


db.authenticate().then(() => {
    console.log("Database connected...");
}).catch(err => console.log("Error: " + err));


async function runApp() {
    try {
        while (true) {
            const answer = await inquirer.prompt([
                {
                    type: "list",
                    message: "Please select one from below:",
                    choices: [
                        "View All Employees",
                        "Add Employee",
                        "View All Roles",
                        "Add Role",
                        "Update Employee Role",
                        "View All Departments",
                        "Add Department",
                        "Exit"
                    ],
                    name: "start",
                },
            ]);

            switch (answer.start) {
                case "View All Employees":
                    await viewAllEmployees();
                    break;
                case "Add Employee":
                    await addEmployee();
                    break;
                case "View All Roles":
                    await viewAllRoles();
                    break;
                case "Add Role":
                    await addRole();
                    break;
                case "Update Employee Role":
                    await updateEmployeeRole();
                    break;
                case "View All Departments":
                    await viewAllDepartments();
                    break;
                case "Add Department":
                    await addDepartment();
                    break;
                case "Exit":
                    console.log("Exiting the application. Goodbye!");
                    return;
                }
            }
        } catch (error) {
            console.error("Error in runApp", error);
        }
    }
    runApp();
