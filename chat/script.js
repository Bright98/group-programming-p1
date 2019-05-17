// //client

$(function()
{
    var socket = io();
    var username;
    var msg;
    $('#username').submit(function(event)
    {
        event.preventDefault();
        username = $('#username_input').val();
        if (username!='')
        {
            socket.emit('username', username);
            $('#login_page').fadeOut('fast');
            $("#main_container").show();
        }
        else
        {
            alert('please enter your username :)')
        }
    });
    $('#form').submit(function(event)
    {
        event.preventDefault();
        msg = $('#text').val();
        if (msg!='')
        {
            socket.emit('chat message', {message : msg, _user : username});
            $('#text').val('');
        }
    });

    socket.on('username',function(name)
    {
        var newItem = document.createElement("p");
        newItem.id = "join";
        newItem.innerHTML = '('+ '<b>' + name + '</b>' + ') ' + ' joined chatroom';
        var list = document.getElementById("message");
        list.appendChild(newItem);
    });

    socket.on('chat message', function(data)
    {
        document.getElementById('message').innerHTML += '<li>' + '<b>' + data._user + '</b>:    ' + data.message + '</li>';
    });

});