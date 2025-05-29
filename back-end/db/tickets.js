// back-end/db/tickets.js
const express = require('express');
const router = express.Router();
const connection = require('./db');

router.get('/api/submitted-tickets', (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  const userId = req.session.user.user_id;

  const query = 'SELECT ticket_id, category, status, createdAt FROM ticket WHERE user_id = ? ORDER BY createdAt DESC';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching tickets:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    return res.json({ success: true, tickets: results });
  });
});

module.exports = router;
