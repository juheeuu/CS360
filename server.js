const express = require('express');
const app = express();
var router = require('./routes/index')(app);

const mysql = require('mysql');
var dbconfig   = require('./config/database.js');
var connection = mysql.createConnection(dbconfig);

connection.connect(function(err) {
  if (err) throw (err);
});


// app.get('/', (req, res) =>{
//   res.end('Hello DB');
// })

const server = app.listen(3000, () => {
  console.log("server is running at ssal.sparcs.org:??:3000")
})
