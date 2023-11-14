const db = require("../config/connection.js");
const inquirer = require("inquirer");

const viewAllRoles = async () => {
    try {
        const results = await db.query('SELECT * FROM roles', { type: db.QueryTypes.SELECT });
        console.table(results);
    } catch (error) {
        console.error("Error retrieving roles:", error);
    }
};

const addRole = async () => {
    try {
        const roleInfo = await inquirer.prompt([
            {
                type: "input",
                message: "Enter role title:",
                name: "title",
            },
            {
                type: "input",
                message: "Enter department ID:",
                name: "department_id",
            },
            {
                type: "input",
                message: "Enter salary:",
                name: "salary",
            },
        ]);

        const { title, department_id, salary } = roleInfo;

        const results = await db.query(
            'INSERT INTO roles (title, department_id, salary) VALUES (?, ?, ?)',
            { replacements: [title, department_id, salary], type: db.QueryTypes.INSERT }
        );

        console.log("Role added successfully:", results);
    } catch (error) {
        console.error("Error adding role:", error);
    }
};

module.exports = { viewAllRoles, addRole };
