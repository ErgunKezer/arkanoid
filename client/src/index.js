import { drawRectangle, reDrawVertical } from './rectangle.js';
import { getKeyFromLocalStorage } from './local-storage.js';
import {
	getKeyFromSessionStorage,
	setSessionStorage,
} from './session-storage.js';

import { io } from 'socket.io-client';

import { drawCircle } from './circle.js';
import { globals } from './model.js';
import { getUsers } from './user.js';
import { init } from './init.js';
const users = getUsers();

function bootstrap() {
	init(globals);
	// TODO: move to init func
	setInterval(drawCircle, 100, {
		user: users[1],
		id: 1,
		globals,
	});

	socket.emit('getId', (id) => {
		globals.userId = id;
	});

	document.addEventListener('keydown', (event) => {
		if (event.keyCode === 38) {
			return reDrawVertical(users[1], globals.rectangle, true);
		}
		if (event.keyCode === 40) {
			return reDrawVertical(users[1], globals.rectangle, false);
		}
	});
}

const socket = io('http://localhost:3001/');

socket.on('connect', () => {
	console.log('connected with ', socket.id);
	bootstrap();
});
