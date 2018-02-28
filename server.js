var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
    user: 'andreasbraumann',
    database: 'andreasbraumann',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
}
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

function createTemplate(data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    var htmlTemplate = `
    <!doctype html>
    <html>
        <head>
            <link href="/ui/style.css" rel="stylesheet" />
            <title>
            </title>
        </head>
        <body>
            <div class="center">
                ${heading}
            </div>
            <br>
            <div class="center text-big bold">
                ${date}<br><br>
                ${content}
            </div>
            <script type="text/javascript" src="/ui/main.js">
            </script>
        </body>
    </html>
    `;

    return htmlTemplate
}
const pool = new Pool(config)


app.get('/test-db', function(req, res) {
    pool.query("SELECT * from test", function (err, result) {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result));
        }
    })
   // test the db 
});


app.get('/hash/:input', function(req, res) {
    var hashedString = hash(req.params.input, "random-string");
    res.send(hashedString);
});

function hash(input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join("$");
}

app.post('/create-user', function (req, res) {
   // username, password
   var username = req.body.username;
   var password = req.body.password;
   
   var salt = crypto.randomBytes(128).toString('hex');
   var hashedPassword = hash(password, salt);
   pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, hashedPassword], function (err, result) {
       if (err) {
            res.status(500).send(err.toString());
        } else {
            res.send("User successfully created: " + username);
        }
   });
});

app.post('/login', function(req, res) {
    pool.query('SELECT * FROM "user" WHERE username=$1)', [username], function (err, result) {
       if (err) {
            res.status(500).send(err.toString());
        } else {
            if (result.rows.length===0) {
                res.send(403).send('username/password is invalid');
            } else {
                // match pw
                var dbPassword = result.rows[0].password
                var salt = dbPassword.split('$')[2];
                var hashedPassword = hash(password, salt); // create hash based on submitted pw and original salt
                if (hashedPassword === dbString) {
                    res.send('User logged in.');
                } else {
                    res.send(403).send("username/password is invalid");
                }
            }
            
            res.send("User successfully created: " + username);
        }
   });
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var counter = 0;
app.get('/counter', function (req, res) {
    counter++;
    res.send(counter.toString());
});

var names = [];
app.get('/name/:currentName', function (req, res) {
    var currentName = req.params.currentName
    names.push(currentName);
    res.send(JSON.stringify(names));
});



app.get('/articles/:articleName', function (req, res) {
    var articleName = req.params.articleName;
    
    pool.query("SELECT * FROM articles WHERE title= $1", [req.params.articleName], function (err, result) {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            if (result.rows.length ===0) {
                res.status(404).send('Article not found.');
            } else {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    })
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
