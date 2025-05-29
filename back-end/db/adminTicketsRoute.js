const express = require('express');
const router = express.Router();
const db = require('./db');

// GET /api/admin/tickets - Fetch all tickets for admin
router.get('/api/admin/tickets', (req, res) => {
  if (!req.session || !req.session.user || req.session.user.role_id !== 2) {
    return res.status(403).json({ success: false, message: 'Access denied: admins only' });
  }

  const sql = `
    SELECT 
      t.ticket_id,
      t.category,
      t.description,
      t.status,
      t.priority,
      t.createdAt,
      u.firstname,
      u.lastname,
      u.email
    FROM ticket t
    JOIN user u ON t.user_id = u.user_id
    ORDER BY t.createdAt DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Admin ticket fetch error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    return res.json({ success: true, tickets: results });
  });
});

module.exports = router;
