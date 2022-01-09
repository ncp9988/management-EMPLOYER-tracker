
const db = require('../db/connection');

// Get ALL departments
const getAllDepartments = async () => {
    const sql = `SELECT * FROM departments`;
    await db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
            return err;
        }
     
        return rows;
    });
};


// DELETE a department
const deleteDepatrtment = () => {
    const sql = `DELETE FROM departments WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
            // checks if anything was deleted
        } else if (!result.affectedRows) {
            res.json({
                message: 'Department not found'
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




module.exports = {getAllDepartments, deleteDepatrtment};