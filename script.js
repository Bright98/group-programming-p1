$(function()
{
    var socket = io();
    var username;
    $('#username').submit(function(event)
    {
        event.preventDefault();
        socket.emit('username', $("username_input").val());
        username = $('#username_input').val();
        $('#login_page').fadeOut('fast');
        $("#main_container").show();
    });
    $('#form').submit(function(event)
    {
        event.preventDefault();
        socket.emit('chat message', $('#text').val());
        $('#text').val('');
        return false;
    });

    socket.on('chat message', function(msg)
    {
        $("#message").append($('<li>').text(username + ":    " + msg));
    });
});