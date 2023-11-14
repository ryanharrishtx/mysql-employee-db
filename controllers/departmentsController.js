const db = require("../config/connection.js");
const inquirer = require("inquirer");

const viewAllDepartments = async () => {
    try {
        const results = await db.query('SELECT * FROM departments', { type: db.QueryTypes.SELECT });
        console.table(results);
    } catch (error) {
        console.error("Error retrieving departments:", error);
    }
};

const addDepartment = async () => {
    try {
        const departmentInfo = await inquirer.prompt([
            {
                type: "input",
                message: "Enter department name:",
                name: "name",
            },
        ]);

        const { name } = departmentInfo;

        const results = await db.query(
            'INSERT INTO departments (name) VALUES (?)',
            { replacements: [name], type: db.QueryTypes.INSERT }
        );

        console.log("Department added successfully:", results);
    } catch (error) {
        console.error("Error adding department:", error);
    }
};

const deleteDepartment = async () => {
    try {
        const departments = await db.query('SELECT id, name FROM departments', { type: db.QueryTypes.SELECT });

        const departmentChoice = await inquirer.prompt([
            {
                type: "list",
                message: "Select a department to delete:",
                choices: departments.map(department => ({ name: department.name, value: department.id })),
                name: "department_id",
            },
        ]);

        const { department_id } = departmentChoice;

        const results = await db.query(
            'DELETE FROM departments WHERE id = ?',
            { replacements: [department_id], type: db.QueryTypes.DELETE }
        );

        console.log("Department deleted successfully:", results);
    } catch (error) {
        console.error("Error deleting department:", error);
    }
};

const getAllDepartments = async () => {
    try {
        const departments = await db.query('SELECT id, name FROM departments', { type: db.QueryTypes.SELECT });
        return departments.map(department => ({ name: department.name, value: department.id }));
    } catch (error) {
        console.error("Error retrieving departments:", error);
        return [];
    }
};

module.exports = { viewAllDepartments, addDepartment, deleteDepartment, getAllDepartments };