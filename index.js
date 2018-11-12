const express = require('express')
const app = express();

app.get('/', (req, res) =>{
  res.end('Hello DB');
})

const server = app.listen(3000, () => {
  console.log("server is running at ssal.sparcs.org:32975")
})
