DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;


CREATE TABLE employees (
  id INTEGER  primary key auto_increment,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER references roles(id),
  manager_id INTEGER references employees(id) on delete set null
);


CREATE TABLE roles (
  id INTEGER primary key auto_increment,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INTEGER references departments(id)
);

CREATE TABLE departments (
  id INTEGER primary key auto_increment,
  name VARCHAR(30)
);



