const express = require('express');
const db = require('./db'); 
const router = express.Router();


router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const sql = "SELECT * FROM USER WHERE email = ?";
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error("Database error:", err.sqlMessage);
            return res.status(500).json({ success: false, message: `Database error: ${err.sqlMessage}` });
        }

        if (result.length === 0 || result[0].password !== password) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        
        const userId = result[0].id;
        const loginTime = new Date();
        const logSql = "INSERT INTO login_logs (user_id, login_time) VALUES (?, ?)";
        db.query(logSql, [userId, loginTime], (logErr) => {
            if (logErr) {
                console.error("Login log error:", logErr.sqlMessage);
            }
        });

        res.status(200).json({ success: true, message: "Login successful" });
        
    });
});

module.exports = router;
