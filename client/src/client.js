import {
	reDrawVertical,
	reDrawWithoutCalculationVertical,
} from './services/player.js';
import { store } from './redux/store.js';
import { getUsers, updateUser } from './services/user.js';
import { init } from './services/init.js';
import { resetWholeGame } from './services/reset.js';
import { getGame } from './services/game.js';
import { setCircleDirection } from './services/ball.js';

const users = getUsers();
const game = getGame();

const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

const descriptionElement = document.getElementById('description');
const gameButtonElement = document.getElementById('gameBtn');

const startGame = (direction) => {
	let countdown = 3;
	const countdownTimer = setInterval(() => {
		if (countdown === 0) {
			gameButtonElement.classList.replace('ready', 'stop');
			gameButtonElement.innerText = 'Stop';
			gameButtonElement.style.visibility = 'visible';

			descriptionElement.classList.add('display_none');
			descriptionElement.innerHTML = `Waiting for other player. You are ${capitalize(
				store.userId
			)}`;

			clearInterval(countdownTimer);
			setCircleDirection(direction);
			game.start();
			return;
		}
		descriptionElement.innerText = `Game will start in ${countdown}s`;
		countdown--;
	}, 1000);
};

function bootstrap() {
	socket.emit('getId', (id, isFirst, isGameFull) => {
		if (!id || isGameFull) {
			descriptionElement.innerText = 'Game is full';
			document.getElementById('game').classList.add('display_none');
			return;
		}
		init(store);
		const userIndex = isFirst ? 0 : 1;
		const rivalIndex = !isFirst ? 0 : 1;
		store.userId = id;
		store.isFirst = isFirst;
		store.userIndex = userIndex;
		store.rivalIndex = rivalIndex;
	});

	socket.on('playerMove', (user) => {
		const updatedUser = updateUser(store.rivalIndex, user);
		reDrawWithoutCalculationVertical(updatedUser, store.rectangle);
	});

	socket.on('startGame', (direction) => {
		startGame(direction);
	});

	socket.on('stopGame', (id) => {
		if (store.userId === id) {
			gameButtonElement.classList.replace('stop', 'ready');
			gameButtonElement.innerText = 'Continue';
			descriptionElement.innerHTML =
				'Game paused, please click ready for continue the game';
		} else {
			gameButtonElement.style.visibility = 'hidden';
			descriptionElement.innerHTML = 'Game paused by other player please wait';
		}
		descriptionElement.classList.remove('display_none');
		game.stop();
	});

	socket.on('resetWholeGame', () => {
		game.stop();
		resetWholeGame(false);
	});

	document.addEventListener('keydown', (event) => {
		if (event.keyCode === 87) {
			return reDrawVertical(users[store.userIndex], true, true);
		}

		if (event.keyCode === 83) {
			return reDrawVertical(users[store.userIndex], false, true);
		}
	});

	gameButtonElement.addEventListener('click', () => {
		const { isReady, userId } = store;
		store.isReady = !isReady;
		if (store.isReady) {
			gameButtonElement.classList.replace('ready', 'stop');
			gameButtonElement.innerText = 'Stop';
			descriptionElement.innerHTML = `Waiting for other player. You are ${capitalize(
				userId
			)}`;
			socket.emit('startGame', userId);
		} else {
			socket.emit('stopGame', userId);
		}
	});
}

const socket = store.socket;

socket.on('connect', () => {
	console.log('connected with ', socket.id);
	bootstrap();
});
