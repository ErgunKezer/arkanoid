import {
	reDrawVertical,
	reDrawWithoutCalculationVertical,
} from './rectangle.js';
import { globals } from './model.js';
import { getUsers, updateUser } from './user.js';
import { init } from './init.js';
import { resetWholeGame } from './reset.js';
import { getGame } from './services/game.js';

const users = getUsers();
const game = getGame();

const descriptionElement = document.getElementById('description');
const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

function bootstrap() {
	socket.emit('getId', (id, isFirst, isGameFull) => {
		if (!id || isGameFull) {
			descriptionElement.innerText = 'Game is full';
			document.getElementById('game').classList.add('display_none');
			return;
		}
		init(globals);
		// game.start();
		console.log('id: ', id);
		const userIndex = isFirst ? 0 : 1;
		const rivalIndex = !isFirst ? 0 : 1;
		globals.userId = id;
		globals.isFirst = isFirst;
		globals.userIndex = userIndex;
		globals.rivalIndex = rivalIndex;
	});

	// setTimeout(game.stop, 3000);

	socket.on('playerMove', (user) => {
		const updatedUser = updateUser(globals.rivalIndex, user);
		reDrawWithoutCalculationVertical(updatedUser, globals.rectangle);
	});

	socket.on('startGame', () => {
		let countdown = 3;
		const countdownTimer = setInterval(() => {
			if (countdown === 0) {
				descriptionElement.classList.add('display_none');
				game.start();
				clearInterval(countdownTimer);
				return;
			}
			descriptionElement.innerText = `Game will start in ${countdown}s`;
			countdown--;
		}, 1000);
	});

	socket.on('resetWholeGame', (direction) => {
		resetWholeGame(globals, false, direction);
	});

	document.addEventListener('keydown', (event) => {
		if (event.keyCode === 87) {
			return reDrawVertical(
				users[globals.userIndex],
				globals.rectangle,
				true,
				true
			);
		}

		if (event.keyCode === 83) {
			return reDrawVertical(
				users[globals.userIndex],
				globals.rectangle,
				false,
				true
			);
		}
	});

	const gameBtn = document.getElementById('gameBtn');
	gameBtn.addEventListener('click', () => {
		console.log(12);
		const { isReady, userId } = globals;
		globals.isReady = !isReady;
		if (globals.isReady) {
			gameBtn.classList.replace('ready', 'stop');
			gameBtn.innerText = 'Stop';
			descriptionElement.innerHTML = `Waiting for other player. You are ${capitalize(
				userId
			)}`;
			socket.emit('startGame', userId);
		} else {
			gameBtn.classList.replace('stop', 'ready');
			gameBtn.innerText = 'Ready';
			descriptionElement.innerHTML = 'Please click ready to start';
			socket.emit('stopGame', userId);
		}
	});
}

const socket = globals.socket;

socket.on('connect', () => {
	console.log('connected with ', socket.id);
	bootstrap();
});
