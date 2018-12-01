module.exports = function(app, fs, connection)
{
  const student_api = require("./student.js")(app, fs, connection);
  const restaurant_api = require("./restaurant.js")(app, fs, connection);

  app.get('/',function(req,res){
    res.render('index.html')
  });
  app.get('/user', function(req,res){
    res.render('user.html')
  });
  app.get('/restaurant', function(req,res){
    res.render('restaurant.html')
  });
  app.get('/user_signup', function(req,res){
    res.render('user_signup.html')
  });
  app.get('/restaurant_signup', function(req,res){
    res.render('restaurant_signup.html')
  });

  app.get('/rating_page', function(req,res){
    res.render('rating.html')
  });

  app.get('/rating_restaurant', function(req,res){
    res.render('rating_restaurant.html')
  });
  app.get('/restaurant_modify', function(req,res){
    res.render('restaurant_modify.html')
  });

  app.post('/duration_add', (req, res) =>{
    const id = req.body["id"];
    const name = req.body["name"];
    const location = req.body["location"];

    const values = [id, location, name];

    //console.log(typeof space)

    connection.query("INSERT INTO Space (idSpace, location, name) VALUES (?, ?, ?)", values, function(err, rows, fields){
      if(err){
        console.log(err);
        res.end("DB error_INSERT")
        return;
      }else{
        res.send({"Success" : "True"});
      }
    });
  });
}
