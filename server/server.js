var express = require('express');
var http = require('http');
var cors = require('cors')

var app = express();
var server = http.Server(app);
var config = require('../config/index');

app.use(cors())

var dataFolder = process.env.NODE_ENV === 'production' ? config.build.env.DATA_FOLDER : config.dev.env.DATA_FOLDER;

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send("PokerBoard Stub API")
})

app.get('/cards', function (req, res) {
  res.send(require("./data/cards.json"))
})

app.get('/stories/:id', function (req, res) {
  res.send(require( `./data/${req.params.id}-stories.json`))
})

app.get('/teams', function (req, res) {
  res.send(require("./data/teams.json"))
})


server.listen(process.env.NODE_ENV === 'production' ? config.build.env.API_PORT : config.dev.env.API_PORT);