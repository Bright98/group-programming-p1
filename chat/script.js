//client

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
        var scroll = document.getElementById('chat_area');
        scroll.scrollTop += 200;
        msg = $('#text').val();
        if (msg!='')
        {
            socket.emit('chat message', {message : msg, _user : username});
            socket.emit('chat msg', {_message : msg, __user : username});
            $('#text').val('');
        }
    });

    socket.on('username',function(name)
    {
        var newItem = document.createElement('p');
        newItem.id = 'join';
        newItem.innerHTML = '('+ '<b>' + name + '</b>' + ') ' + ' joined chatroom';
        var list = document.getElementById('message');
        list.appendChild(newItem);
    });

    socket.on('chat message', function(data)
    {
        var newItem = document.createElement('li');
        newItem.id = 'message_li';
        newItem.innerHTML = '<b>' + data._user + '</b>:     ' + data.message;
        var list = document.getElementById('message');
        list.appendChild(newItem);
    });

    socket.on('chat msg', function(data)
    {
        var newItem = document.createElement('li');
        newItem.id = 'msg_li';
        newItem.innerHTML = '<b>' + data.__user + '</b>:     ' + data._message;
        var list = document.getElementById('message');
        list.appendChild(newItem);
    });

});