// var words = require('./words.js');
var words = require('./words2.js');
var express = require('express');
var app = express();

app.use(express.static(__dirname + "/src/static"));

var server = require('http').Server(app);
var io = require('socket.io')(server);

let curIndex = 0;
let timer = null;
let timeLeft = 0;

console.log(words);

function startTimer(){
  if(timer !== null){
    clearInterval(timer);
    timer = null;
  }

  timeLeft = 30;
  io.emit('time', timeLeft);
  
  timer = setInterval(() => {
    if(timeLeft > 1){
      timeLeft -= 1;
      io.emit('time', timeLeft);
    }
    else{
      timeLeft = 0;
      io.emit('time', timeLeft);
      clearInterval(timer);
      timer = null;
    }
  }, 1000);
}

io.on('connection', function(socket){
  console.log('a user connected');

  socket.emit('words', words[curIndex]);
  socket.emit('time', timeLeft);

  socket.on('nextWords', function(){
    curIndex++;
    io.emit('words', words[curIndex]);
    startTimer();
  });
  
  socket.on('restartTime', function(){      
    startTimer();
  });
});

app.get('/', function (req, res) {
  // console.log('User ip: ', req.ip, req.connection.localAddress);
  // console.log('Server ip: ', req.connection.loadAddress);
  res.sendFile(__dirname + '/src/index.html');
});

server.listen(5000, function(){
  console.log('listening on *:5000');
});