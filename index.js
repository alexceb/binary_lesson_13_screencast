 

var messages = [];

app.get('/', function(req, res) {
	res.sendFile(staticDir + 'index.html');
});

app.get('/socket', function(req, res) {
	res.sendFile(staticDir + 'index_socket.html');
});

app.get('/messages', function(req, res) {
	res.json(messages);
});

app.post('/messages', function(req, res) {
	var message = req.body;
	messages.push(message);
	res.json(message);
});

io.on('connection', function(socket) {

	console.log('CLient connected!');

	socket.on('disconnected', function() {
		console.log('CLient disconnected!');
	});

	socket.on('chat message', function(msg) {
		messages.push(msg);
		io.emit('chat message', msg);
	});

	socket.emit('chat history', messages);
});