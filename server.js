
const db = require('./db/connection')
// const {getAllDepartment, deleteDepartment} = require('./lib/department');
// const {getAllEmployee, updateEmployeeRole, updateEmployeeManager, deleteEmploy} = require('./lib/employee');
// const {getAllRole, deleteRole} = require('./lib/role');

const inquirer = require('inquirer');
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
            'Exit',
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

                break;
            case "Add A Role":
                break;
            case "Add An Employee":
                break;
            case "Update Employee Role":
                break;
            case "Update Employee Manager":
                break;
            case "View Employees By Manager":
                break;
            case "View Employees by Department":
                break;
            case "Delete Department":
                break;
            case "Delete Role":
                break;
            case "Delete Employee":
                break
            default:
                process.exit(0)
        }
    })
};

// ADD a Department

const addDepartment = () => {
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


// app.post('/department', ({ body }, res) => {
//     const errors = inputCheck(
//         body,
//         'name'
//     );
//     if (errors) {
//         res.status(400).json({ error: errors });
//         return;
//     }

//     const sql = `INSERT INTO departments (name) VALUES (?)`;
//     const params = [
//         body.name
//     ];

//     db.query(sql, params, (err, result) => {
//         if (err) {
//             res.status(400).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: body,
//             changes: result.affectedRows
//         });
//     });
// });






// // ADD a Role

// const addRole = () => {
//     return inquirer.prompt([
//         {
//             type: 'input',
//             name: 'roleName',
//             message: "What is the name of the role?",
//         },
//         {
//             type: 'input',
//             name: 'roleSalary',
//             message: "What is the salary of the role?",
//         },
//         {
//             type: 'input',
//             name: 'roleDepartment',
//             message: "What is the department of the role?",
//         },
//     ]);
// };

// app.post('/role', ({ body }, res) => {
//     const errors = inputCheck(
//         body,
//         'title',
//         'salary',
//         'department_id'
//     );
//     if (errors) {
//         res.status(400).json({ error: errors });
//         return;
//     }

//     const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
//     const params = [
//         body.title,
//         body.salary,
//         body.department_id
//     ];

//     db.query(sql, params, (err, result) => {
//         if (err) {
//             res.status(400).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: body,
//             changes: result.affectedRows
//         });
//     });
// });





// // ADD a EMPLOYEE

// const addEmployee = () => {
//     return inquirer.prompt([
//         {
//             type: 'input',
//             name: 'employeeFirstName',
//             message: "What is employee's first name",
//         },
//         {
//             type: 'input',
//             name: 'employeeLastName',
//             message: "What is employee's last name?",
//         },
//         {
//             type: 'input',
//             name: 'employeeRole',
//             message: "What is employee's role?",
//         },
//         {
//             type: 'input',
//             name: 'employeeManager',
//             message: "Who is employee's manager?"
//         },
//     ]);
// };


// app.post('/employee', ({ body }, res) => {
//     const errors = inputCheck(
//         body,
//         'first_name',
//         'last_name',
//         'role_id',
//         'manager_id'
//     );
//     if (errors) {
//         res.status(400).json({ error: errors });
//         return;
//     }

//     const sql = `INSERT INTO emloyees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
//     const params = [
//         body.first_name,
//         body.last_name,
//         body.role_id,
//         body.manager_id
//     ];

//     db.query(sql, params, (err, result) => {
//         if (err) {
//             res.status(400).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: body,
//             changes: result.affectedRows
//         });
//     });
// });






// // View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.





// // Start server after DB connection
// db.connect(err => {
//     if (err) throw err;
//     console.log('Database connected.');
//     app.listen(PORT, () => {
//         console.log(`Server running on port ${PORT}`);
//     });
// });