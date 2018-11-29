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

}
