const express = require('express');
const router = express.Router();
const db = require('./db');

// Serve profile.html
router.get('/profile', (req, res) => {
  if (!req.session || !req.session.user) {
    return res.redirect('/login');
  }
  res.sendFile('profile.html', { root: 'front-end/views' });
});

// API: Get logged-in user's profile data
router.get('/api/profile', (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  const userId = req.session.user.user_id;

  const sql = `
    SELECT u.firstname, u.lastname, u.email, u.createdAt, r.RoleName AS role
    FROM user u
    JOIN role r ON u.role_id = r.role_id
    WHERE u.user_id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching profile:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user: results[0] });
  });
});

module.exports = router;
