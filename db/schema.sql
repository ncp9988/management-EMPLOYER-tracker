DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;


CREATE TABLE employees (
  id INTEGER,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  manager_id INTEGER
);


CREATE TABLE roles (
  id INTEGER,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INTEGER
);

CREATE TABLE departments (
  id INTEGER,
  name VARCHAR(30)
);



