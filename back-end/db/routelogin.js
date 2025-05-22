const express = require('express');
const db = require('./db');
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  const sql = `
    SELECT u.*, r.RoleName 
    FROM USER u 
    JOIN ROLE r ON u.role_id = r.role_id 
    WHERE u.email = ?
  `;

  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Database error:", err.sqlMessage);
      return res.status(500).json({ success: false, message: `Database error: ${err.sqlMessage}` });
    }

    const user = result[0];
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    if (user.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    req.session.user = {
      id: user.user_id,
      email: user.email,
      firstname: user.firstname,
      role_id: user.role_id,
      role: user.RoleName  
    };

    req.session.save(err => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ success: false, message: "Session error" });
      }

      let redirectTo = '/';
      if (user.role_id === 2) {
        redirectTo = '/AdminDashboard';
      } else if (user.role_id === 3) {
        redirectTo = '/user-dashboard';
      }

      return res.json({
        success: true,
        redirectTo: redirectTo
      });
    });
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Could not log out.');
    }
    res.redirect('/login');
  });
});

module.exports = router;
