
const db = require('../db/connection');


// Get ALL roles
const getAllRole = async () => {
    const sql = `SELECT * FROM roles`;
    await db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
            return err;
        }
        return rows;
    });
};


// DELETE a role
const deleteRole = () => {
    const sql = `DELETE FROM roles WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
            // checks if anything was deleted
        } else if (!result.affectedRows) {
            res.json({
                message: 'Role not found'
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


module.exports = {getAllRole, deleteRole};