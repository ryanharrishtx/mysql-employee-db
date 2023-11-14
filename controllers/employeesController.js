const db = require("../config/connection.js");
const inquirer = require("inquirer");

const viewAllEmployees = async () => {
    try {
        const results = await db.query('SELECT * FROM employees', { type: db.QueryTypes.SELECT });
        console.table(results);
    } catch (error) {
        console.error("Error retrieving employees:", error);
    }
};

const addEmployee = async () => {
    try {
        const employeeInfo = await inquirer.prompt([
            {
                type: "input",
                message: "Enter first name:",
                name: "first_name",
            },
            {
                type: "input",
                message: "Enter last name:",
                name: "last_name",
            },
            {
                type: "input",
                message: "Enter role ID:",
                name: "role_id",
            },
            {
                type: "input",
                message: "Enter manager ID (leave blank if none):",
                name: "manager_id",
            },
        ]);

        const { first_name, last_name, role_id, manager_id } = employeeInfo;

        const results = await db.query(
            'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
            { replacements: [first_name, last_name, role_id, manager_id || null], type: db.QueryTypes.INSERT }
        );

        console.log("Employee added successfully:", results);
    } catch (error) {
        console.error("Error adding employee:", error);
    }
};

const updateEmployeeRole = async () => {
    try {
        const employees = await db.query('SELECT id, first_name, last_name FROM employees', { type: db.QueryTypes.SELECT });

        const employeeChoice = await inquirer.prompt([
            {
                type: "list",
                message: "Select an employee to update:",
                choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id })),
                name: "employee_id",
            },
        ]);

        const newRoleId = await inquirer.prompt([
            {
                type: "input",
                message: "Enter the new role ID:",
                name: "role_id",
            },
        ]);

        const { employee_id, role_id } = newRoleId;

        const results = await db.query(
            'UPDATE employees SET role_id = ? WHERE id = ?',
            { replacements: [role_id, employee_id], type: db.QueryTypes.UPDATE }
        );

        console.log("Employee role updated successfully:", results);
    } catch (error) {
        console.error("Error updating employee role:", error);
    }
};


module.exports = { viewAllEmployees, addEmployee, updateEmployeeRole };
