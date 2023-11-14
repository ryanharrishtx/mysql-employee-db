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

module.exports = { viewAllDepartments, addDepartment };