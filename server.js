const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const connection = require('./back-end/db/db');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(express.static(path.join(__dirname, 'front-end')));
app.use(express.static(path.join(__dirname, 'front-end', 'views')));

function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) return next();
  return res.redirect('/login');
}
function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role_id === 2) return next();
  return res.status(403).send('Access denied: Admins only');
}

function isUser(req, res, next) {
  if (req.session.user && req.session.user.role_id === 3) return next();
  return res.status(403).send('Access denied: Users only');
}



app.get('/homepage', (req, res) => {
  res.sendFile(path.join(__dirname, 'front-end', 'views', 'homepage.html'));
});

app.get('/user-dashboard', isAuthenticated, isUser, (req, res) => {
  res.sendFile(path.join(__dirname, 'front-end', 'views', 'user-dashboard.html'));
});

app.get('/AdminDashboard', isAuthenticated, isAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, 'front-end', 'views', 'AdminDashboard.html'));
});
app.get('/submittedtickets', isAuthenticated, isUser, (req, res) => {
  res.sendFile(path.join(__dirname, 'front-end', 'views', 'submittedtickets.html'));
});
app.get('/submitAticket', isAuthenticated, isUser, (req, res) => {
  res.sendFile(path.join(__dirname, 'front-end', 'views', 'submitAticket.html'));
});

app.use("/", require("./back-end/db/routes"));
app.use("/", require("./back-end/db/routelogin"));
app.use("/", require("./back-end/db/tickets"));
app.use("/", require("./back-end/db/formRoutes"));
app.use('/', require('./back-end/db/profileRoute'));
app.use('/', require('./back-end/db/slaRoute'));
app.use('/', require('./back-end/db/logoutRoute'));
app.use('/', require('./back-end/db/adminTicketsRoute'));




connection.connect((err) => {
  if (err) {
    console.error('DB connection error:', err);
    return;
  }
  console.log('Connected to the MySQL database!');
});


app.use((req, res) => {
  res.status(404).send('404: Page not found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
