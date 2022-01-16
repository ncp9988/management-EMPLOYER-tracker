
const db = require('./db/connection')
// const {getAllDepartment, deleteDepartment} = require('./lib/department');
// const {getAllEmployee, updateEmployeeRole, updateEmployeeManager, deleteEmploy} = require('./lib/employee');
// const {getAllRole, deleteRole} = require('./lib/role');

const inquirer = require('inquirer');
// const { deleteDepatrtment } = require('./lib/department');
// const { deleteRole } = require('./lib/role');
// const { deleteEmployee } = require('./lib/employee');
require("console.table")

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
    ]).then(({ roleAdded }) => {
        db.query("INSERT INTO ROLES (title, salary, department_id) VALUES (?,?,?)", roleAdded,
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
    ]).then(({ employeeAdded }) => {
        db.query("INSERT INTO EMPLOYEES (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", employeeAdded,
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
    db.query("UPDATE voters SET role_id = ? WHERE id = ?")
    if (err) {
        console.log(err)
        return err;
    }
    console.table(rows)
    toDo()
    
};

// UPDATE Employee Manager
function updateEmployeeManager() {
    db.query("UPDATE voters SET manager_id = ? WHERE id = ?");
    if (err) {
        console.log(err)
        return err;
    }
    console.table(rows)
    toDo()
};

// VIEW Employees By Manager
function viewEmployeeByManager() {
    db.query("SELECT FROM employees WHERE id = ?");
    if (err) {
        console.log(err)
        return err;
    }
    console.table(rows)
    toDo()
};

// VIEW Employee By Department
function viewEmployeeByDepartment() {
    db.query("SELECT FROM employees WHERE id = ?");
    if (err) {
        console.log(err)
        return err;
    }
    console.table(rows)
    toDo()
};

// Delete Department
function deleteDepartment() {
    db.query('DELETE FROM deparments WHERE id = ?');
    if (err) {
        console.log(err)
        return err;
    }
    console.table(rows)
    toDo()
};

//Delete Role
function deleteRole() {
    db.query("DELETE FROM roles WHERE id = ?");
    if (err) {
        console.log(err)
        return err;
    }
    console.table(rows)
    toDo()
};

//Delete Employee
function deleteEmployee() {
    db.query("DELETE FROM employees WHERE id = ?");
    if (err) {
        console.log(err)
        return err;
    }
    console.table(rows)
    toDo()
};











// // View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.





// // Start server after DB connection
// db.connect(err => {
//     if (err) throw err;
//     console.log('Database connected.');
//     app.listen(PORT, () => {
//         console.log(`Server running on port ${PORT}`);
//     });
// });