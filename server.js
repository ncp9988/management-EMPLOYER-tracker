
const db = require('./db/connection');
const inquirer = require('inquirer');

require("console.table");

db.connect(function (err) {
    if (err) console.log("Error in conncecting to Database", err);
    toDo()
})
// Asking What would you like to do?
const toDo = () => {
    inquirer.prompt({
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: ['View All Departments',
            'View All Roles',
            'View All Employees',
            'Add A Department',
            'Add A Role',
            'Add An Employee',
            'Update Employee Role',
            'Update Employee Manager',
            'View Employees By Manager',
            'View Employees by Department',
            'Delete Department',
            'Delete Role',
            'Delete Employee',
            'Exit'
        ],

    }).then((response) => {
        switch (response.options) {
            case "View All Departments":
                getAllDepartments()
                break;
            case "View All Roles":
                console.log(getAllRole());
                break;
            case "View All Employees":
                console.log(getAllEmployee());
                break;
            case "Add A Department":
                addDepartment()
                break;
            case "Add A Role":
                addRole()
                break;
            case "Add An Employee":
                addEmployee()
                break;
            case "Update Employee Role":
                updateEmployeeRole()
                break;
            case "Update Employee Manager":
                updateEmployeeManager()
                break;
            case "View Employees By Manager":
                viewEmployeeByManager()
                break;
            case "View Employees by Department":
                viewEmployeeByDepartment()
                break;
            case "Delete Department":
                deleteDepartment()
                break;
            case "Delete Role":
                deleteRole()
                break;
            case "Delete Employee":
                deleteEmployee()
                break
            default:
                process.exit(0)
        }
    })
};


// Get ALL departments
function getAllDepartments() {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)

        }

        console.table(rows)
        toDo()
    });
};

// Get ALL roles
function getAllRole() {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)

        }

        console.table(rows)
        toDo()
    });
};

// Get ALL employees
function getAllEmployee() {
    const sql = `SELECT * FROM employees`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table(rows)
        toDo()
    });
};

// ADD a Department

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: "What is the name of the department?",
        }

    ]).then(({ departmentName }) => {
        db.query("INSERT INTO DEPARTMENTS (NAME) VALUES(?)", departmentName,
            (err, rows) => {
                if (err) {
                    console.log(err)
                    return err;
                }
                console.table(rows)
                toDo()
            })
    })
};

// ADD Roles
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: "What is the name of the role?",
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: "What is the salary of the role?",
        },
        {
            type: 'input',
            name: 'roleDepartment',
            message: "What is the department of the role?",
        },
    ]).then(({ roleName, roleSalary, roleDepartment }) => {
        db.query("INSERT INTO ROLES (title, salary, department_id) VALUES (?,?,?)", [roleName, roleSalary, roleDepartment],
            (err, rows) => {
                if (err) {
                    console.log(err)
                    return err;
                }
                console.table(rows)
                toDo()
            })
    })
};

// ADD a EMPLOYEE
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeFirstName',
            message: "What is employee's first name",
        },
        {
            type: 'input',
            name: 'employeeLastName',
            message: "What is employee's last name?",
        },
        {
            type: 'input',
            name: 'employeeRole',
            message: "What is employee's role?",
        },
        {
            type: 'input',
            name: 'employeeManager',
            message: "Who is employee's manager?"
        },
    ]).then(({ employeeFirstName, employeeLastName, employeeRole, employeeManager }) => {
        db.query("INSERT INTO EMPLOYEES (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [employeeFirstName, employeeLastName, employeeRole, employeeManager],
            (err, rows) => {
                if (err) {
                    console.log(err)
                    return err;
                }
                console.table(rows)
                toDo()
            })
    })
};

// UPDATE Employee Role
function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeID',
            message: 'What is employee ID?'
        },
        {
            type: 'input',
            name: 'roleID',
            message: 'What is the new role ID you want to update?'
        }
    ]).then(({ employeeID, roleID }) => {
        db.query("UPDATE employees SET role_id = ? WHERE id = ?", [roleID, employeeID], (err, rows) => {
            if (err) {
                console.log(err)
                return err;
            }
            console.table(rows)
            toDo()
        })
    })
};


// UPDATE Employee Manager
function updateEmployeeManager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeID',
            message: 'What is employee ID?'
        },
        {
            type: 'input',
            name: 'managerID',
            message: 'What is the new manager ID you want to update?'
        }
    ]).then(({ employeeID, managerID }) => {
        db.query("UPDATE employees SET manager_id = ? WHERE id = ?", [managerID, employeeID], (err, rows) => {

            if (err) {
                console.log(err)
                return err;
            }
            console.table(rows)
            toDo()
        })
    })

};

// VIEW Employees By Manager
function viewEmployeeByManager() {
    db.query("SELECT a.id, a.first_name,a.last_name,a.role_id, a.manager_id, b.first_name, b.last_name from  employees a, employees b where a.manager_id = b.id order by a.manager_id;",
        (err, rows) => {
            if (err) {
                console.log(err)
                return err;
            }
            console.table(rows)
            toDo()
        });
};

// VIEW Employee By Department
function viewEmployeeByDepartment() {
    db.query("select a.id,a.first_name,a.last_name,a.role_id,b.title,b.salary,b.department_id,c.name from employees a,roles b,departments c where a.role_id =b.id and b.department_id = c.id;",
        (err, rows) => {
            if (err) {
                console.log(err)
                return err;
            }
            console.table(rows)
            toDo()
        });

};

// Delete Department
function deleteDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentID',
            message: 'What is department ID you want to delete?'
        }
    ]).then(({ departmentID }) => {
        db.query("DELETE FROM departments WHERE id = ?", departmentID, (err, rows) => {
            if (err) {
                console.log(err)
                return err;
            }
            console.table(rows)
            toDo()
        })
    })
};

//Delete Role
function deleteRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleID',
            message: 'What is role ID you want to delete?'
        }
    ]).then(({ roleID }) => {
        db.query("DELETE FROM roles WHERE id = ?", roleID, (err, rows) => {
            if (err) {
                console.log(err)
                return err;
            }
            console.table(rows)
            toDo()
        })
    })
};

//Delete Employee
function deleteEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeID',
            message: 'What is employee ID you want to delete?'
        }
    ]).then(({ employeeID }) => {
        db.query("DELETE FROM employees WHERE id = ?", employeeID, (err, rows) => {
            if (err) {
                console.log(err)
                return err;
            }
            console.table(rows)
            toDo()
        })
    })
};

