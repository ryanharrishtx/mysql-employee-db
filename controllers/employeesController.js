const db = require("../config/connection.js");
const inquirer = require("inquirer");
const { getAllRoles } = require("./rolesController.js");


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
                type: "list",
                message: "Enter role ID:",
                choices: await getAllRoles(),
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

const deleteEmployee = async () => {
    try {
        const employees = await db.query('SELECT id, first_name, last_name FROM employees', { type: db.QueryTypes.SELECT });

        const employeeChoice = await inquirer.prompt([
            {
                type: "list",
                pageSize: 30,
                message: "Select an employee to delete:",
                choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id })),
                name: "employee_id",
            },
        ]);

        const { employee_id } = employeeChoice;

        const results = await db.query(
            'DELETE FROM employees WHERE id = ?',
            { replacements: [employee_id], type: db.QueryTypes.DELETE }
        );

        console.log("Employee deleted successfully:", results);
    } catch (error) {
        console.error("Error deleting employee:", error);
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
                type: "list",
                message: "Select the new role:",
                choices: await getAllRoles(),
                name: "role_id",
            },
        ]);

        const { role_id } = newRoleId;
        const { employee_id } = employeeChoice;

        const results = await db.query(
            'UPDATE employees SET role_id = ? WHERE id = ?',
            { replacements: [role_id, employee_id], type: db.QueryTypes.UPDATE }
        );

        console.log("Employee role updated successfully:", results);
    } catch (error) {
        console.error("Error updating employee role:", error);
    }
};


const viewEmployeesByDepartment = async () => {
    try {
        const departments = await db.query('SELECT id, name FROM departments', { type: db.QueryTypes.SELECT });

        const departmentChoice = await inquirer.prompt([
            {
                type: "list",
                message: "Select a department:",
                choices: departments.map(department => ({ name: department.name, value: department.id })),
                name: "department_id",
            },
        ]);

        const { department_id } = departmentChoice;

        const results = await db.query(
            'SELECT * FROM employees WHERE role_id IN (SELECT id FROM roles WHERE department_id = ?)',
            { replacements: [department_id], type: db.QueryTypes.SELECT }
        );

        console.table(results);
    } catch (error) {
        console.error("Error retrieving employees by department:", error);
    }
};


module.exports = { viewAllEmployees, addEmployee, updateEmployeeRole, deleteEmployee, viewEmployeesByDepartment };

