
const db = require('../db/connection');


// Get ALL employees
const getAllEmployee = async () => {
    const sql = `SELECT * FROM employees`;
    await db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
            return err;
        }
        return rows;
    });
};


//UPDATE an employee's role
const updateEmployeeRole = () => {
    // Data validation
    const errors = inputCheck(req.body, 'role_id');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `UPDATE voters SET role_id = ? WHERE id = ?`;
    const params = [req.body.role_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
};


//UPDATE an employee's manager
const updateEmployeeManager = () => {
    // Data validation
    const errors = inputCheck(req.body, 'manager_id');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `UPDATE voters SET manager_id = ? WHERE id = ?`;
    const params = [req.body.manager_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
};


// VIEW employees by MANAGER

// VIEW employees by DEPARTMENT

// DELETE a employee
const deleteEmployee = () => {
    const sql = `DELETE FROM employees WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
            // checks if anything was deleted
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
};




module.exports = {getAllEmployee, updateEmployeeRole, updateEmployeeRole, deleteEmployee};