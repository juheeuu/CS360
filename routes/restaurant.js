module.exports = function(app, fs, connection){
  app.post('/restaurant_signup', (req, res) =>{
    console.log("POST /restaurant_signup");
    const id = req.body["id"];
    const password = req.body["password"];
    const name = req.body["name"];
    const category = req.body["category"];
    const phoneNumber = req.body["PhoneNumber"];
    const location = req.body["location"];
    const menu = req.body["Menu"];

    const values = [id, name, category, phoneNumber, location, menu, password];

    //console.log(typeof space)

    connection.query("SELECT * FROM Restaruant WHERE idRestaruant=?", [id], function(err, rows, fields){
      if(err){
        console.log(err);
        res.end("DB error_SELECT")
        return;
      }

      if(rows.length > 0){
        res.send({"Success" : "False", "Message" : "Already existing id"});
        return;
      }else{
        //INSERT INTO `Delivery`.`Student` (`idStudent`, `Password`, `prefermenu`) VALUES ('1', '1234', '2');
        connection.query("INSERT INTO Restaruant (idRestaruant, name, category, PhoneNumber, location, Menu, password) VALUES (?, ?, ?, ?, ?, ?, ?)", values, function(err, rows, fields){
          if(err){
            console.log(err);
            res.end("DB error_INSERT")
            return;
          }else{
            res.send({"Success" : "True"});
          }
        });
      }
    });
  });

  app.get('/restaurant/all', (req, res) =>{
    console.log("GET /restaurant/all");
    connection.query("SELECT * FROM Restaruant", function(err, rows, fields){
      if(err){
        console.log(err);
        res.end("DB error")
        return;
      }
      //const result = {"Success" : "True", "Data" : rows}
      res.send(rows);
    });
  });



  app.get('/restaurant/inform', (req, res) =>{
    console.log("GET /restaurant/inform");
    const rid = req.query.rid;
    connection.query("SELECT * FROM Restaruant WHERE idRestaruant=?", [rid], function(err, rows, fields){
      if(err){
        console.log(err);
        res.end("DB error")
        return;
      }

      // If result exist
      if(rows.length == 0){
        res.send({"Success" : "False", "Message" : "No data"});
        return;
      }
      else if(rows.length > 1){
        res.send({"Success" : "False", "Message" : "Duplicated data"});
        return;
      }else{
        //rows[0].Success = "True"
        res.send(rows[0]);
        res.end();
        return;
      }
    });
  });

  app.get('/restaurant/menu', (req, res) =>{
    console.log("GET /restaurant/menu");
    const rid = req.query.rid;
    connection.query("SELECT * FROM Menu WHERE resID=?", [rid], function(err, rows, fields){
      if(err){
        console.log(err);
        res.end("DB error")
        return;
      }

      res.send(rows);
      res.end();
    });
  });


  // JOIN 사용
  app.get('/restaurant/comments', (req, res) =>{
    console.log("GET /restaurant/comments");
    const rid = req.query.rid;
    //connection.query("SELECT * FROM Evlauation WHERE Restaruant_idRestaruant=?", [rid], function(err, rows, fields){
    connection.query("SELECT Student_idStudent,EvaluationData,EvaluationValue FROM (Evlauation JOIN Restaruant) WHERE idRestaruant=?", [rid], function(err, rows, fields){
      if(err){
        console.log(err);
        res.end("DB error")
        return;
      }

      // If result exist
      if(rows.length == 0){
        res.send({"Success" : "False", "Message" : "No data"});
        return;
      }else{
        //const ans = {"Success" : "True", "Data" : rows};
        res.send(rows);
        res.end();
        return;
      }
    });
  });

  //aggregation
  app.get('/restaurant/avg_value', (req, res) =>{
    console.log("GET /restaurant/avg_value");
    const rid = req.query.rid;
    //connection.query("SELECT * FROM Evlauation WHERE Restaruant_idRestaruant=?", [rid], function(err, rows, fields){
    connection.query("SELECT AVG(EvaluationValue) FROM Evlauation WHERE Restaruant_idRestaruant=?", [rid], function(err, rows, fields){
      if(err){
        console.log(err);
        res.end("DB error")
        return;
      }

      //const ans = {"Success" : "True", "Value" : rows[0]["AVG(EvaluationValue)"]}
      const ans = {"Value" : rows[0]["AVG(EvaluationValue)"]}
      res.send(ans);
    });
  });

  app.get('/restaurant_login', (req, res) =>{
    console.log("GET /restaurant_login");
    const sess = req.session;
    const id = req.query.id;
    const password = req.query.password;

    connection.query("SELECT * FROM Restaruant WHERE idRestaruant=? AND password=?", [id, password], function(err, rows, fields){
      if(err){
        console.log(err);
        res.end("DB error")
        return;
      }

      if(rows.length == 1){
        sess.restaurant_id = id;
        res.send({"Success" : "True"});
        return;
      }else{
        res.send({"Success" : "False", "Message" : "Login Failure"});
        return;

      }
    });
  });

  app.get('/restaurant_logout', function(req, res){
    const sess = req.session;
    if(sess.id){
        req.session.destroy(function(err){
            if(err){
                console.log(err);
            }else{
                res.redirect('/');
            }
        })
    }else{
        res.redirect('/');
    }
  });

  app.get('/restaurant/myinfo', (req, res) =>{
    console.log("GET /restaurant/myinfo");
    const sess = req.session;
    const id = sess.restaurant_id;
    console.log(sess);
    console.log(id);
    connection.query("SELECT * FROM Restaruant WHERE idRestaruant=?", [id], function(err, informs, fields){
      if(err){
        console.log(err);
        res.end("DB error")
        return;
      }

      if(informs.length == 0){
        res.send({"Success" : "False", "Message" : "No user"});
        return;
      }
      else if(informs.length > 1){
        res.send({"Success" : "False", "Message" : "Duplicated id"});
        return;
      }else{
        connection.query("SELECT Space_idSpace FROM Duration WHERE Restaruant_idRestaruant=?", [id], function(err, rows, fields){
          if(err){
            console.log(err);
            res.end("DB error")
            return;
          }
          const sid_list = []
          for(var i = 0; i < rows.length; i++){
            sid_list.push(rows[i].Space_idSpace)
          }
          informs[0].places = sid_list;
          //const ans = {"Success" : "True", "Inform" : informs[0]};
          res.send(informs[0]);
        });
      };
    });
  });

  app.get('/delivery/category', (req, res) =>{
    console.log("GET /delivery/category");
    const category = req.query.category;
    connection.query("SELECT * FROM Restaruant WHERE category=?", [category], function(err, rows, fields){
      if(err){
        console.log(err);
        res.end("DB error")
        return;
      }

      // If result exist
      if(rows.length == 0){
        res.send({"Message" : "No data"});
        return;
      }else{
        //const ans = {"Success" : "True", "Data" : rows};
        res.send(rows);
        res.end();
        return;
      }
    });
  });

  app.get('/delivery/space', (req, res) =>{
    console.log("GET /delivery/space");
    const sid = req.query.sid;
    connection.query("SELECT * FROM Duration WHERE Space_idSpace=?", [sid], function(err, rows, fields){
      if(err){
        console.log(err);
        res.end("DB error")
        return;
      }

      // If result exist
      if(rows.length == 0){
        res.send({"Success" : "False", "Message" : "No data"});
        return;
      }else{
        //const ans = {"Success" : "True", "Data" : rows};
        res.send(rows);
        res.end();
        return;
      }
    });
  });

  app.get('/delivery/restaurant', (req, res) =>{
    console.log("GET /delivery/restaurant");
    const rid = req.query.rid;
    connection.query("SELECT * FROM Duration WHERE resID=?", [rid], function(err, rows, fields){
      if(err){
        console.log(err);
        res.end("DB error")
        return;
      }

      // If result exist
      if(rows.length == 0){
        res.send({"Success" : "False", "Message" : "No data"});
        return;
      }else{
        //const ans = {"Success" : "True", "Data" : rows};
        res.send(rows);
        res.end();
        return;
      }
    });
  });
}
