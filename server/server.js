import { Server } from 'socket.io';

const port = 3001;
const io = new Server({
	cors: ['http://localhost:8080/'],
});

const ids = ['red', 'blue'];
const idsTaken = [];

io.on('connection', (socket) => {
	socket.on('user', (params) => {
		socket.broadcast.emit('user', params);
	});

	socket.on('getId', (cb) => {
		if (idsTaken.length === ids.length) {
			return cb();
		}
		const availableId = ids.find(
			(id) => !idsTaken.find((idt) => idt.id === id)
		);
		if (availableId) {
			idsTaken.push({ socketId: socket.id, id: availableId });
		}
		cb(availableId);
	});
	socket.on('disconnect', () => {
		const ind = idsTaken.findIndex((idt) => idt.socketId === socket.id);
		if (ind >= 0) {
			idsTaken.splice(ind, 1);
		}
		console.log('disconnect', idsTaken);
	});
});

io.listen(port, () => {
	console.log('server is open on port ', port);
});
