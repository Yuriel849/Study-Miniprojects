const express = require('express')
const app = express()

// Set the template engine ejs
app.set('view engine', 'ejs')

// Middlewares
app.use(express.static('public'))

// Routes
app.get('/', (req, res) => {
	res.send('Hello world')
})

// Listen on port 3000
server = app.listen(3000)

// socket.io instantiation (access the socket.io library)
const io = require('socket.io')(server)

// Make "io" listen on every connection
io.on('connection', (socket) => {
    console.log('New user connected')
})