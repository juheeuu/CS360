const http = require('http');
const { parse } = require('querystring');
function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

module.exports = function(app, fs, connection){
  app.post('/restaurant_signup', (req, res) =>{
    collectRequestData(req, result => {
        console.log("POST /restuarant_signup");
        console.log(result);

        const id = result.id;
        const password = result.password;
        const name = result.name;
        const category = result.category;
        const phoneNumber = result.phoneNumber;

        const delivers = []
        if(result.girldorm == "pos") delivers.push(3);
        if(result.taxi == "pos") delivers.push(4);
        if(result.east == "pos") delivers.push(5);
        if(result.hope == "pos") delivers.push(6);

        const values = [id, name, category, phoneNumber, password];
        console.log(delivers);
        console.log(values);

        var i = 0;
        for(i = 0; i < values.length; i++){
          if(values[i] == ""){
            res.redirect("/");
            console.log("no value!")
            return;
          }
        }

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
            connection.query("INSERT INTO Restaruant (idRestaruant, name, category, PhoneNumber, password) VALUES (?, ?, ?, ?, ?)", values, function(err, rows, fields){
              if(err){
                console.log(err);
                res.end("DB error_INSERT")
                return;
              }else{
                var j = 3;

                while(delivers.indexOf(j) < 0 && j < 7) j++;
                if(j > 6){
                  res.redirect('/')
                  return;
                }
                connection.query("INSERT INTO Duration (space, resID) VALUES (?, ?)", [j, id], function(err, rows, fields){
                  if(err){
                    console.log(err);
                    res.end("DB error_INSERT Duration")
                    return;
                  }else{
                    console.log(j)
                    j++;
                    while(delivers.indexOf(j) < 0 && j < 7) j++;
                    if(j > 6){
                      res.redirect('/')
                      return;
                    }
                    connection.query("INSERT INTO Duration (space, resID) VALUES (?, ?)", [j, id], function(err, rows, fields){
                      if(err){
                        console.log(err);
                        res.end("DB error_INSERT Duration")
                        return;
                      }else{
                        console.log(j)
                        j++;
                        while(delivers.indexOf(j) < 0 && j < 7) j++;
                        if(j > 6){
                          res.redirect('/')
                          return;
                        }
                        connection.query("INSERT INTO Duration (space, resID) VALUES (?, ?)", [j, id], function(err, rows, fields){
                          if(err){
                            console.log(err);
                            res.end("DB error_INSERT Duration")
                            return;
                          }else{
                            console.log(j)
                            j++;
                            while(delivers.indexOf(j) < 0 && j < 7) j++;
                            if(j > 6){
                              res.redirect('/')
                              return;
                            }
                            connection.query("INSERT INTO Duration (space, resID) VALUES (?, ?)", [j, id], function(err, rows, fields){
                              if(err){
                                console.log(err);
                                res.end("DB error_INSERT Duration")
                                return;
                              }else{
                                console.log(j)
                                res.redirect('/');
                                return;
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
    });
  });


  app.post('/restaurant_modify', (req, res) =>{
    collectRequestData(req, result => {
      console.log("POST /restaurant_modify");
      const id = req.session.restaurant_id;

      console.log(result);
      const name = result.name;
      const phoneNumber = result.PhoneNumber;
      const category = result.category;

      const values = [name, category, phoneNumber, id];
      var i = 0;
      for(i = 0; i < values.length; i++){
        if(values[i] == ""){
          res.redirect("/");
          console.log("no value!")
          return;
        }
      }

      connection.query("UPDATE Restaruant SET name=?, category=?, PhoneNumber=? WHERE idRestaruant=?", values, function(err, rows, fields){
        if(err){
          console.log(err);
          res.end("DB error")
          return;
        }
        res.redirect('/restaurant')
      });

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
    //const rid = req.query.rid;
    const rid = req.session["restaurant_id"];
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
  app.get('/rating', (req, res) =>{
    console.log("GET /rating");
    const rid = req.query.rid;
    connection.query("SELECT stuId,Description,score FROM (Rating JOIN Restaruant ON resId = idRestaruant) WHERE idRestaruant=?", [rid], function(err, rows, fields){
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
  app.get('/rating/avg_value', (req, res) =>{
    console.log("GET /rating/avg_value");
    const rid = req.query.rid;
    connection.query("SELECT AVG(score) FROM Rating WHERE resId=?", [rid], function(err, rows, fields){
      if(err){
        console.log(err);
        res.end("DB error")
        return;
      }

      //const ans = {"Success" : "True", "Value" : rows[0]["AVG(EvaluationValue)"]}
      if(rows[0]["AVG(score)"] == null){
        const ans = {"Value" : rows[0]["AVG(score)"]}
        res.send(ans)
      }else{
        const ans = {"Value" : rows[0]["AVG(score)"].toFixed(2)}
        res.send(ans);
      }
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


  app.get('/restaurant_unsubscribe', function(req, res){
    const sess = req.session;

    if(sess.restaurant_id == null){
      res.send({"Success" : "False"});
    }

    connection.query("DELETE FROM Rating WHERE resID=?", [sess.restaurant_id], function(err, rows, fields){
      if(err){
        console.log(err);
        res.send("DB error")
        return;
      }else{
        connection.query("DELETE FROM Duration WHERE resID=?", [sess.restaurant_id], function(err, rows, fields){
          if(err){
            console.log(err);
            res.send("DB error")
            return;
          }else{
            connection.query("DELETE FROM Menu WHERE resID=?", [sess.restaurant_id], function(err, rows, fields){
              if(err){
                console.log(err);
                res.send("DB error")
                return;
              }else{
                connection.query("DELETE FROM Restaruant WHERE idRestaruant=?", [sess.restaurant_id], function(err, rows, fields){
                  if(err){
                    console.log(err);
                    res.send("DB error")
                    return;
                  }

                  if(rows.affectedRows == 1){
                    res.send({"Success" : "True"});
                    if(sess.restaurant_id){
                        req.session.destroy();
                    }
                  }else{
                    res.send({"Success" : "False"});
                  }
                });
              }
            });
          }
        });
      }
    });
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
    connection.query("SELECT * FROM Duration WHERE space=?", [sid], function(err, rows, fields){
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
