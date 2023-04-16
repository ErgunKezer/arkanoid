import { Server } from 'socket.io';
import { numberGenerator } from './src/helpers/numberGenerator.js';
const port = 3001;
const io = new Server({
	cors: ['http://localhost:8080/'],
});

const ids = ['red', 'blue'];
const idRelations = [
	{
		id: 'red',
		isFirst: true,
	},
	{
		id: 'blue',
		isFirst: false,
	},
];
const idsTaken = [];
const readyStatus = {
	red: false,
	blue: false,
};

io.on('connection', (socket) => {
	socket.on('getId', (cb) => {
		if (idsTaken.length === ids.length) {
			return cb(undefined);
		}
		const availableId = ids.find(
			(id) => !idsTaken.find((idt) => idt.id === id)
		);
		if (availableId) {
			const isGameFull = idsTaken.length === 2;
			idsTaken.push({ socketId: socket.id, id: availableId });
			const relation = idRelations.find((idr) => idr.id === availableId);
			return cb(availableId, relation.isFirst, isGameFull);
		}
		cb(undefined);
	});

	socket.on('playerMove', (user) => {
		socket.broadcast.emit('playerMove', user);
	});

	socket.on('resetWholeGame', () => {
		const ballDirection = {
			x: numberGenerator(0, 1),
			y: numberGenerator(0, 1),
		};
		io.sockets.emit('resetWholeGame', ballDirection);
	});

	socket.on('disconnect', () => {
		const ind = idsTaken.findIndex((idt) => idt.socketId === socket.id);
		if (ind >= 0) {
			readyStatus[idsTaken[ind].id] = false;
			idsTaken.splice(ind, 1);
		}
	});

	socket.on('startGame', (id) => {
		if (!id && readyStatus[id] === undefined) {
			return;
		}
		readyStatus[id] = true;
		const isReady = Object.values(readyStatus).every((status) => status);
		if (isReady) {
			io.sockets.emit('startGame');
		}
	});

	socket.on('stopGame', (id) => {
		if (!id && readyStatus[id] === undefined) {
			return;
		}
		readyStatus[id] = false;
		io.sockets.emit('stopGame', id);
	});
});

io.listen(port, () => {
	console.log('server is open on port ', port);
});
