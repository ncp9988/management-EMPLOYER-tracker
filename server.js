const express = require('express');
// const inputCheck = require('./utils/inputCheck');
const db = require('./db/connection')
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);

const toDo = () => {
    inquirer.prompt({
        type: 'list',
        name: 'toDo',
        message: 'What would you like to do?',
        choices: [ 'View All Departments', 'View All Roles','View All Employees', 'Add A Department', 'Add A Role',' Add An Employee', 'Update Employee Role', 'Update Employee Manager','View Employees By Manager', 'View Employees by Department','Delete Department','Delete Role', 'Delete Employees'],

    });
};


const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: "What is the name of the department?",
        },
    
    ]);
};

// ADD a Department
app.post('/department', ({ body }, res) => {
    const errors = inputCheck(
        body,
        'name'
    );
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO departments (name) VALUES (?)`;
    const params = [
        body.name
    ];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body,
            changes: result.affectedRows
        });
    });
});

const addRole = () => {
    return inquirer.prompt([
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
    ]);
};

// ADD a Role
app.post('/role', ({ body }, res) => {
    const errors = inputCheck(
        body,
        'title',
        'salary',
        'department_id'
    );
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
    const params = [
        body.title,
        body.salary,
        body.department_id
    ];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body,
            changes: result.affectedRows
        });
    });
});

const addEmployee = () => {
    return inquirer.prompt([
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
    ]);
};


// ADD a EMPLOYEE
app.post('/employee', ({ body }, res) => {
    const errors = inputCheck(
        body,
        'first_name',
        'last_name',
        'role_id',
        'manager_id'
    );
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO emloyees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [
        body.first_name,
        body.last_name,
        body.role_id,
        body.manager_id
    ];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body,
            changes: result.affectedRows
        });
    });
});



    








// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });