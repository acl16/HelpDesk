const express = require('express');
const router = express.Router();
const connection = require('./db');

// ✅ Helper function to convert Date → 'YYYY-MM-DD HH:mm:ss'
function formatToMySQLDateTime(date) {
  const pad = n => (n < 10 ? '0' + n : n);
  return date.getFullYear() + '-' +
         pad(date.getMonth() + 1) + '-' +
         pad(date.getDate()) + ' ' +
         pad(date.getHours()) + ':' +
         pad(date.getMinutes()) + ':' +
         pad(date.getSeconds());
}

router.post('/submit-ticket', (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ success: false, message: 'User not authenticated' });
  }

  const user_id = req.session.user.user_id;
  const { category, description, priority } = req.body;

  if (!category || !description || !priority) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const status = 'Open';
  const createdAt = new Date();
  const updatedAt = new Date();

  const ticketQuery = `
    INSERT INTO ticket (user_id, category, description, priority, status, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    ticketQuery,
    [user_id, category, description, priority, status, createdAt, updatedAt],
    (err, results) => {
      if (err) {
        console.error('Error inserting ticket:', err);
        return res.status(500).json({ success: false, message: 'Ticket submission failed.' });
      }

      const ticket_id = results.insertId;

      // ✅ NOW: Get real current time for SLA
      const currentTime = new Date();

      // SLA time by priority
      let slaHours = 8;
      if (priority === 'High') slaHours = 4;
      else if (priority === 'Low') slaHours = 16;

      const dueTime = new Date(currentTime.getTime() + slaHours * 60 * 60 * 1000);

      const formattedStart = formatToMySQLDateTime(currentTime);
      const formattedDue = formatToMySQLDateTime(dueTime);

      const slaQuery = `
        INSERT INTO sla (ticket_id, startTime, DueTime)
        VALUES (?, ?, ?)
      `;

      connection.query(slaQuery, [ticket_id, formattedStart, formattedDue], (slaErr) => {
        if (slaErr) {
          console.error('Error inserting SLA:', slaErr);
          return res.status(500).json({ success: false, message: 'Ticket created but SLA failed.' });
        }

        return res.status(200).json({ success: true, message: 'Ticket and SLA submitted successfully!' });
      });
    }
  );
});

module.exports = router;
