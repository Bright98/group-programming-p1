// //client
// var msg;
// msg = $('#text').val('');
// $(function()
// {
//     var socket = io();
//     $('#username').submit(function(event)
//     {
//         event.preventDefault();
//         socket.emit('username', $('#username_input').val());
//         $('#login_page').fadeOut('fast');
//         $("#main_container").show();
//         return false;
//     });
//     $('#form').submit(function(event)
//     {
//         event.preventDefault();
//         socket.emit('chat message', $('#text').val());
//         $('#text').val('');
//         return false;
//     });
//     var user;
//     socket.on('set username', function(name)
//     {
//         user = name.usr;
//         $("#usr").append($('<li>').text(user));
//     });
//     //socket.emit('chat message', {message : msg , _user : user});
//     socket.on('message', function(data)
//     {
//             //$("#usr").append($('<li>').text(data._user));
//             $("#message").append($('<li>').text(msg));
//     });
// });

$(function()
{
    var socket = io();
    var username;
    var msg;
    $('#username').submit(function(event)
    {
        event.preventDefault();
        username = $('#username_input').val();
        socket.emit('username', username);
        $('#login_page').fadeOut('fast');
        $("#main_container").show();
    });
    $('#form').submit(function(event)
    {
        event.preventDefault();
        msg = $('#text').val();
        socket.emit('chat message', {message : msg, _user : username});
        $('#text').val('');
        return false;
    });

    socket.on('chat message', function(data)
    {
        $("#message").append($('<li>').text(data._user + ":     " + data.message));
    });
});