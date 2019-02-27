// Client-side socket.io can only work from within a JS file

$(function() {
    // Make connection
    var socket = io.connect('http://localhost:3000')
    
    // Buttons and inputs
    var message = $('#message')
    var username = $('#username')
    var send_message = $('#send_message')
    var send_username = $('#send_username')
    var chatroom = $('#chatroom')
    var feedback = $("#feedback")
    
    // Send a new username to the server (=> app.js)
    send_username.click(function() {
        // "console.log()" prints to the browser (ex) Google Chrome)
        console.log(username.val())
        
        // Sends to the event "change_username" at the server (=> app.js)
        socket.emit('change_username', {username : username.val()})
    })
    
    // Send a message to the server (=> app.js)
    send_message.click(function() {
        // Sends to the event "new_message" at the server (=> app.js)
        socket.emit('new_message', {message : message.val()})
    })
    
    // Listen for data coming from the server
    socket.on('new_message', (data) => {
        console.log(data)
        chatroom.append("<p>" + data.username + " : " + data.message + "</p>")
    })
    
    // Send typing
    message.bind('keypress', () => {
        socket.emit('typing')
    })
    
    // Listen on typing
    socket.on('typing', (data) => {
        feedback.html("<p><i>" + data.username + " is typing a message...</i></p>")
    })
});