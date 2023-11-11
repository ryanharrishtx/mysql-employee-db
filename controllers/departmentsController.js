const db = require("../config/connection.js");

const viewAllDepartments = () => {
    db.query('SELECT * FROM department', (err, results) => {
        return results;
    });
};

const addDepartment = () => {
    db.query('INSERT INTO departments (name) VALUES (?)' [name], (err, results) => {
        return results;
    });
}

module.exports = { viewAllDepartments, addDepartment };