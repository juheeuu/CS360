const express = require('express');
const app = express();
const fs = require("fs");

const session = require('express-session');
app.use(session({
  secret:'@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized: true
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

const mysql = require('mysql');
<<<<<<< HEAD
const db_config = require('./config/database.js');
var connection = mysql.createConnection(db_config);

connection.connect(function(err) {
  if (err) throw (err);
  else console.log("DB connected")
});
=======
var dbconfig   = require('./config/database.js');

// var connection = mysql.createConnection(dbconfig);

// connection.connect(function(err) {
//   if (err) throw (err);
// });
>>>>>>> 873b1f72023bf2db74d01cadb490b8b1b8caef8b

var router = require('./routes/index')(app, fs, connection)

const server = app.listen(3000, () => {
  console.log("server is running at ssal.sparcs.org:??:3000")
})
