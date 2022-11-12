require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const e = require('express');
const createAndSaveUrl = require('./shcema').createAndSaveUrl;
const Url = require('./shcema').Url;
const findURL = require('./shcema').findURL;
const findurlbyId = require('./shcema').findurlbyId;
const findurlTheId = require('./shcema').findurlTheId;
// Basic Configuration

app.use(cors());
// forntend middelware
app.use('/public', express.static(`${process.cwd()}/public`));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// parse application/json
app.use(bodyParser.json())

app.use(express.json({limit: '1mb'}));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// database conncation

const mySecret = process.env['DBURL'];
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });


// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.end();
});

// comopleting the challange
app.post('/api/shorturl', (req, res, next) => {
  const {url} = req.body;
  const regExp = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  if (!url.match(regExp)) {
    res.json({ error: "invalid url" });
    return 1;
  } else {
      findURL(url, (err, d) => {
        if(err){
          console.log("not found")
        }else if(d === null) {
          createAndSaveUrl(url);
          findurlTheId((err, d) => {
            if(err) console.error(err);
            else {
              res.json({"original_url":url, "short_url":d});
            }
          })
          return 0;
        }else{
          res.json({"original_url":d["original"], "short_url":d["_id"]});
          return 0;
        }
      });
    }
})

app.get('/api/shorturl/:id', (req, res) => {
  findurlbyId(req.params.id, (error, d) => {
    if(error){
      console.log(error);
    }else {
      res.writeHead(301, {
        Location: d.original
      }).end();
    }
  })  
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
