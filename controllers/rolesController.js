const db = require("../config/connection.js");
const inquirer = require("inquirer");
const { getAllDepartments } = require("../controllers/departmentsController.js");

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
                type: "list",
                message: "Enter department ID:",
                choices: await getAllDepartments(),
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

const deleteRole = async () => {
    try {
        const roles = await db.query('SELECT id, title FROM roles', { type: db.QueryTypes.SELECT });

        const roleChoice = await inquirer.prompt([
            {
                type: "list",
                pageSize: 15,
                message: "Select a role to delete:",
                choices: roles.map(role => ({ name: role.title, value: role.id })),
                name: "role_id",
            },
        ]);

        const { role_id } = roleChoice;

        const results = await db.query(
            'DELETE FROM roles WHERE id = ?',
            { replacements: [role_id], type: db.QueryTypes.DELETE }
        );

        console.log("Role deleted successfully:", results);
    } catch (error) {
        console.error("Error deleting role:", error);
    }
};

const getAllRoles = async () => {
    try {
        const roles = await db.query('SELECT id, title FROM roles', { type: db.QueryTypes.SELECT });
        return roles.map(role => ({ name: role.title, value: role.id }));
    } catch (error) {
        console.error("Error retrieving roles:", error);
        return [];
    }
};

module.exports = { viewAllRoles, addRole, deleteRole, getAllRoles };
