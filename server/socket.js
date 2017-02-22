var express = require('express');
var http = require('http');
var app = express();

var server = http.Server(app);
var io = require('socket.io')(server);
var config = require('../config/index');

server.listen(process.env.NODE_ENV === 'production' ? config.build.env.SOCKET_PORT : config.dev.env.SOCKET_PORT);

/**
 * Start Express server.
 */
io.on('connection', (socket) => {
  socket.on('estimation:choosen', (estimation) => {
    io.emit('estimation:added', estimation)
  });

  socket.on('estimations:cleared', (estimation) => {
    io.emit('clear:estimation', estimation)
  });

  socket.on('presence:user', (user) => {
    io.emit('user:added', user)
  });

  socket.on('presence:user:disconnect', (user) => {
    io.emit('user:disconnected', user)
  });
});

