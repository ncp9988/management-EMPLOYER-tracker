INSERT INTO departments (name)
VALUES
('Marketing'),('IT'),('Sales');




INSERT INTO roles (title, salary, department_id)
VALUES
('Manager',43439,1),('Team lead',768,1),
('Manager',4343009,2),('Team lead',7688,2),
('Manager',434390,3),('Team lead',223458,3);



INSERT INTO employees 
(first_name, last_name, role_id, manager_id)
VALUES
('Mike', 'Grey', 1, 0),
('Jane', 'Brown', 2, 1),
('Brad', 'Cool', 3, 3),
('Mike', 'Greyyyy',4, 0),
('Jane', 'Brownie', 5, 0),
('Brad', 'Coollll', 6, 5);




