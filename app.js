const inquirer = require("inquirer");
const db = require("./config/connection.js");

const { viewAllDepartments, addDepartment, deleteDepartment } = require("./controllers/departmentsController.js");
const { viewAllEmployees, addEmployee, updateEmployeeRole, deleteEmployee, viewEmployeesByDepartment } = require("./controllers/employeesController.js");
const { viewAllRoles, addRole, deleteRole } = require("./controllers/rolesController.js");


db.authenticate().then(() => {
    console.log("Database connected...");
}).catch(err => console.log("Error: " + err));


async function runApp() {
    try {
        while (true) {
            const answer = await inquirer.prompt([
                {
                    type: "list",
                    pageSize: 15,
                    message: "Please select one from below:",
                    choices: [
                        "View All Employees",
                        "View Employees by Department",
                        "Add Employee",
                        "Delete Employee",
                        "View All Roles",
                        "Add Role",
                        "Delete Role",
                        "Update Employee Role",
                        "View All Departments",
                        "Add Department",
                        "Delete Department",
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
                case "View Employees by Department":
                    await viewEmployeesByDepartment();
                    break;
                case "View Employees by Manager":
                    await viewEmployeesByManager();
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
                case "Delete Employee":
                    await deleteEmployee();
                    break;
                case "Delete Role":
                    await deleteRole();
                    break;
                case "Delete Department":
                    await deleteDepartment();
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
