INSERT INTO departments (name)
VALUES ("Sales"),
       ("Escrow"),
       ("Marketing"),
       ("Administration"),
       ("Human Resources");

INSERT INTO roles (title, department_id, salary)
VALUES ("Business Development", 1, 50000),
       ("Sales Manager", 1, 75000),
       ("Escrow Officer", 2, 100000),
       ("Escrow Assistant", 2, 50000),
       ("Marketing Manager", 3, 60000),
       ("Marketing Assistant", 3, 40000),
       ("Administration Manager", 4, 60000),
       ("Human Resources Manager", 5, 60000);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Ryan", "Harris", 2, NULL),
       ("Carly", "Jepsen", 1, 1),
       ("Victor", "Villacies", 3, NULL),
       ("Rene", "Trevino", 4, 3),
       ("Tiffany", "Gabel", 5, NULL),
       ("Meral", "Stillwell", 6, 5),
       ("Katie", "Tribeca", 7, NULL),
       ("Dustin", "Hoffman", 8, NULL);