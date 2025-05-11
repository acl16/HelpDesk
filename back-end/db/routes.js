const express = require("express");
const router = express.Router();
const db = require("./db");
const path = require("path");

router.use("/", require("./routelogin"));

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../../front-end/views/login.html"));
});
router.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../../front-end/views/signup.html"));
});
router.get("/user-dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../../front-end/views/user-dashboard.html"));
});
router.get("/AdminDashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../../front-end/views/AdminDashboard.html"));
});

router.post("/signup", (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const roleId = req.body.roleId || 1;
    const createdAt = req.body.createdAt || new Date();

    console.log("Received data:", req.body);

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const sql = `
        INSERT INTO USER (role_id, firstname, lastname, email, password, createdAt)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [roleId, firstName, lastName, email, password, createdAt], (err, result) => {
        if (err) {
            console.error("Database insertion error:", err.sqlMessage);
            return res.status(500).json({ message: `Database error: ${err.sqlMessage}` });
        }
        res.status(201).json({ message: "Signup successful!" });

    });
});


module.exports = router;
