const express = require('express');
const router = express.Router();
const db = require('./db');

// GET /api/sla - Return SLA info joined with ticket info
router.get('/api/sla', (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const sql = `
    SELECT s.sla_id, s.startTime, s.DueTime, t.ticket_id, t.category, t.priority
    FROM sla s
    JOIN ticket t ON s.ticket_id = t.ticket_id
    WHERE t.user_id = ?
    ORDER BY s.DueTime ASC
  `;

  db.query(sql, [req.session.user.user_id], (err, results) => {
    if (err) {
      console.error('SLA fetch error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    res.json({ success: true, records: results });
  });
});

// POST /api/sla - Create a new SLA manually (optional)
router.post('/api/sla', (req, res) => {
  const { ticket_id, startTime, DueTime } = req.body;

  if (!ticket_id || !startTime || !DueTime) {
    return res.status(400).json({ success: false, message: 'Missing ticket_id, startTime, or DueTime' });
  }

  const insertQuery = `
    INSERT INTO sla (ticket_id, startTime, DueTime)
    VALUES (?, ?, ?)
  `;

  db.query(insertQuery, [ticket_id, startTime, DueTime], (err, result) => {
    if (err) {
      console.error('SLA insert error:', err);
      return res.status(500).json({ success: false, message: 'Database error during SLA insertion' });
    }

    res.json({
      success: true,
      message: 'SLA record created successfully',
      sla_id: result.insertId
    });
  });
});

module.exports = router;
