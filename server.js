const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connection = require('./back-end/db/db');  

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'front-end')));

app.get('/user-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'front-end', 'views', 'user-dashboard.html'));
});
app.get('/AdminDashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'front-end', 'views', 'AdminDashboard.html'));
});

app.use("/scripts", express.static(path.join(__dirname, "front-end/scripts")));
app.use("/styles", express.static(path.join(__dirname, "front-end/styles")));


connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database!');
});

app.use("/", require("./back-end/db/routes"));
app.use("/", require("./back-end/db/routelogin"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
