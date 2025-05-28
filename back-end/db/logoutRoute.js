const express = require('express');
const router = express.Router();

// GET /logout - Destroys session and redirects to login
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).send('Error during logout.');
    }
    res.redirect('/login'); // ✅ Redirect after logout
  });
});

module.exports = router;
