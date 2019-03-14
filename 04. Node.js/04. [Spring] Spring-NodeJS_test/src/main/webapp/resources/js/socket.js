// Create SocketIO instance and connect
var socket = new io.Socket('localhost', {
	port: 12050
});
socket.connect();

// Add a connect listener
socket.on('connect', function() {
	console.log('Client has connected to the server');
});

// Add a connect listener
socket.on('message', function(data) {
	console.log('Received a message from the server!', data);
});

// Add a disconnect listener
socket.on('disconnect', function() {
	console.log('The client has disconnected!');
});

// Send a message to the server via sockets
function sendMessageToServer(message) {
	socket.send(message);
};