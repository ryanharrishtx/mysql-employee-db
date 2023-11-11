const db = require("../config/connection.js");

const viewAllEmployees = async () => {
    try {
        const results = await db.query('SELECT * FROM employees', { type: db.QueryTypes.SELECT });
        console.table(results);
    } catch (error) {
        console.error("Error retrieving employees:", error);
    }
};

const addEmployee = async (first_name, last_name, role_id, manager_id) => {
    try {
        const results = await db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', { replacements: [first_name, last_name, role_id, manager_id], type: db.QueryTypes.INSERT });
        console.log("Employee added successfully:", results);
    } catch (error) {
        console.error("Error adding employee:", error);
    }
};

module.exports = { viewAllEmployees, addEmployee };
