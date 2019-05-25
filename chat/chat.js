// //server

var express=require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users=[];
app.use(express.static(__dirname));
app.get('/', function(req, res)
{
  res.sendFile(__dirname + '/chat.html');
});
io.on('connection', function(socket)
{

  socket.on('chat message', function(msg)
  {
    socket.broadcast.emit('chat message', msg);  //for other
  });

  socket.on('chat msg', function(msg)
  {
    socket.emit('chat msg', msg);  //for sender
  });

  socket.on('username', function(name)
  {
    users.push(name);
    io.emit('username', name);
  });

});
http.listen(3000, function()
{
  console.log('listening on *:3000');
});