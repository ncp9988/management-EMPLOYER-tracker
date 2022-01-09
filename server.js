
const inputCheck = require('./utils/inputCheck');
const db = require('./db/connection')
const apiRoutes = require('./routes/apiRoutes');


app.use('/api', apiRoutes);


// Asking What would you like to do?
const toDo = () => {
    inquirer.prompt({
        type: 'list',
        name: 'toDo',
        message: 'What would you like to do?',
        choices: [ 'View All Departments', 'View All Roles','View All Employees', 'Add A Department', 'Add A Role',' Add An Employee', 'Update Employee Role', 'Update Employee Manager','View Employees By Manager', 'View Employees by Department','Delete Department','Delete Role', 'Delete Employees'],

    });
};

// ADD a Department

const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: "What is the name of the department?",
        },
    
    ]);
};


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






// ADD a Role

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





// ADD a EMPLOYEE

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






// View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.





// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });