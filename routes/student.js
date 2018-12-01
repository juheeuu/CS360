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
  app.post('/student_signup', (req, res) =>{
    collectRequestData(req, result => {
        console.log("POST /student_signup");
        // console.log(req.body);
        // const id = req.body["id"];
        // const password = req.body["password"];
        // const prefermenu = req.body["prefermenu"];
        // const space = req.body["idSpace"];
        //console.log(typeof space)
        var id = result.id;
        var password = result.password;
        var prefermenu = result.prefermenu;
        var space = result.idSpace;

        connection.query("SELECT * FROM Student WHERE idStudent=?", [id], function(err, rows, fields){
          if(err){
            console.log(err);
            res.end("DB error_SELECT")
            return;
          }
          if(rows.length > 0){
            //res.send({"Success" : "False", "Message" : "Already existing id"});
            // req.flash("Error", "이미 존재하는 아이디입니다")
            res.redirect("/user_signup");

            return;
          }else{
            //INSERT INTO `Delivery`.`Student` (`idStudent`, `Password`, `prefermenu`) VALUES ('1', '1234', '2');
            connection.query("INSERT INTO Student (idStudent, Password, prefermenu, idSpace) VALUES (?, ?, ?, ?)", [id, password, prefermenu, space], function(err, rows, fields){
              if(err){
                console.log(err);
                res.end("DB error_INSERT")
                return;
              }else{
                //res.send({"Success" : "True"});
                res.redirect("/")
              }
            });
          }
        });
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
        res.send("DB error")
        return;
      }

      if(rows.length == 1){
        sess.user_id = id;
        res.send({"Success" : "True"});
      }else{
        res.send({"Success" : "False"});
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
        res.send("DB error")
        return;
      }

      if(rows.affectedRows == 1){
        res.send({"Success" : "True"});
        if(sess.id){
            req.session.destroy();
        }
      }else{
        res.send({"Success" : "False"});
      }
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
        //result.Success = "True";
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
        //const ans = {"Success" : "True", "Data" : rows};
        res.send(rows);
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
      res.send({"Success" : "True"});
    });
  });

  app.post('/rating/edit', (req, res) =>{
    console.log("POST /rating/edit");
    //const id = req.session.user_id;
    const id = "2";
    const rid = req.query.rid;

    const score = req.body.score;
    const content = req.body.Description;

    const ans = [id, rid, content, score];
    connection.query("INSERT INTO Rating (stuId, resId, Description, score) VALUES (?, ?, ?, ?)", ans, function(err, rows, fields){
      if(err){
        console.log(err);
        res.end("DB error")
        return;
      }
      res.send({"Success" : "True"});
    });
  });


}
