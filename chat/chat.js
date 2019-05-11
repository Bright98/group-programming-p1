var express=require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));
app.get('/', function(req, res)
{
  res.sendFile(__dirname + '/chat.html');
});
io.on('connection', function(socket)
{

  socket.on('chat message', function(msg)
  {
    io.emit('chat message', msg);
  });
  socket.on('username', function(name)
  {
    io.emit('username', name);
  });

});
http.listen(3000, function()
{
  console.log('listening on *:3000');
});