module.exports = function(app, fs, connection){
  app.post('/student_signup', (req, res) =>{
    console.log("POST /student_signup");
    //console.log(req.body);
    const id = req.body["id"];
    const password = req.body["password"];
    const prefermenu = req.body["prefermenu"];
    const space = req.body["idSpace"];
    //console.log(typeof space)

    connection.query("SELECT * FROM Student WHERE idStudent=?", [id], function(err, rows, fields){
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
        connection.query("INSERT INTO Student (idStudent, Password, prefermenu, idSpace) VALUES (?, ?, ?, ?)", [id, password, prefermenu, space], function(err, rows, fields){
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

  app.get('/student_login', (req, res) =>{
    console.log("GET /login");
    const sess = req.session;
    const id = req.query.id;
    const password = req.query.password;

    connection.query("SELECT * FROM Student WHERE idStudent=? AND Password=?", [id, password], function(err, rows, fields){
      if(err){
        console.log(err);
        res.end("DB error")
        return;
      }

      if(rows.length == 1){
        sess.user_id = id;
        res.send({"Success" : "True"});
      }else{
        res.end({"Success" : "False"});
      }
    });
  });

  app.get('/student_logout', function(req, res){
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

  app.get('/student_unsubscribe', function(req, res){
    const sess = req.session;

    connection.query("DELETE FROM Student WHERE idStudent=?", [3], function(err, rows, fields){
      if(err){
        console.log(err);
        res.end("DB error")
        return;
      }

      if(rows.affectedRows == 1){
        res.send({"Success" : "True"});
        if(sess.id){
            req.session.destroy();
        }
      }else{
        res.end({"Success" : "False"});
      }
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
        res.send({"Success" : "False", "Message" : "No data"});
        return;
      }else{
        const ans = {"Success" : "True", "Data" : rows};
        res.send(ans);
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
        const ans = {"Success" : "True", "Data" : rows};
        res.send(ans);
        res.end();
        return;
      }
    });
  });

  app.get('/delivery/restaurant', (req, res) =>{
    console.log("GET /delivery/restaurant");
    const rid = req.query.rid;
    connection.query("SELECT * FROM Duration WHERE Restaruant_idRestaruant=?", [rid], function(err, rows, fields){
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
        const ans = {"Success" : "True", "Data" : rows};
        res.send(ans);
        res.end();
        return;
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
      const result = {"Success" : "True", "Data" : rows}
      res.send(result);
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
        rows[0].Success = "True"
        res.send(rows[0]);
        res.end();
        return;
      }
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
        const ans = {"Success" : "True", "Data" : rows};
        res.send(ans);
        res.end();
        return;
      }
    });
  });


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

      const ans = {"Success" : "True", "Value" : rows[0]["AVG(EvaluationValue)"]}
      res.send(ans);
    });
  });



  app.get('/preferred', (req, res) =>{
    console.log("GET /preferred");
    const id = req.session.user_id;
    console.log(req.session);
    console.log(id);
    connection.query("SELECT prefermenu FROM Student WHERE idStudent=?", [id], function(err, rows, fields){
      if(err){
        console.log(err);
        res.end("DB error")
        return;
      }

      if(rows.length == 0){
        res.send({"Success" : "False", "Message" : "No user"});
        return;
      }
      else if(rows.length > 1){
        res.send({"Success" : "False", "Message" : "Duplicated id"});
        return;
      }else{
        const user = rows[0];
        const result = {};
        result.Success = "True";
        result.category = user.prefermenu;
        res.send(result);
      };
    });
  });

  //subquery
  app.get('/preferred_restaurants', (req, res) =>{
    console.log("GET /preferred");
    const id = req.session.user_id;
    console.log(req.session);
    console.log(id);
    connection.query("SELECT * FROM Restaruant R WHERE R.category IN (SELECT S.prefermenu FROM Student S WHERE S.idStudent=?)", [id], function(err, rows, fields){
      if(err){
        console.log(err);
        res.end("DB error")
        return;
      }

      if(rows.length == 0){
        res.send({"Success" : "False", "Message" : "No restuarants"});
        return;
      }else{
        const ans = {"Success" : "True", "Data" : rows};
        res.send(ans);
        res.end();
        return;
      }
    });
  });

  app.post('/preferred/edit', (req, res) =>{
    console.log("POST /preferred/edit");
    const id = req.session.user_id;
    const changed = req.body.preferred;
    connection.query("UPDATE Student SET prefermenu = ? WHERE idStudent=?", [changed, id], function(err, rows, fields){
      if(err){
        console.log(err);
        res.end("DB error")
        return;
      }
      res.end({"Success" : "True"});
    });
  });
}
