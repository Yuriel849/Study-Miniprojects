// Server-side, launches server and packages

const express = require('express')
const app = express()

// Set the template engine ejs
app.set('view engine', 'ejs')

// Middlewares
app.use(express.static('public'))

// Routes
app.get('/', (req, res) => {
	res.render('index')
})

// Listen on port 3000
server = app.listen(3000)

// socket.io instantiation (access the socket.io library)
const io = require('socket.io')(server)

// Make "io" listen on every connection
io.on('connection', (socket) => { // "(socket)" represents each client connected to the server
    console.log('New user connected')
    
    // Default username given to new client connecting to the server
    socket.username = "Anonymous"
    
    // Listen on change_username (if data is sent to the event "change_username", the username will be changed)
    socket.on('change_username', (data) => {
        // "console.log()" prints to the terminal (ex) Git Bash)
        console.log(socket.username)
        console.log(data.username)
        
        socket.username = data.username
    })
    
    // Listen on new_message (if data is sent to the event "new_message")
    socket.on('new_message', (data) => {
        // Broadcast the new message => "io.sockets" means all connected sockets (message is sent to all sockets, all users)
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })
    
    // Listen on typing
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', {username : socket.username})
    })
})
