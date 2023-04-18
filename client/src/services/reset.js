import { configurations } from '../configurations/configurations.js';
import { paint, clearBallArea } from './ball.js';
import { getUsers } from './user.js';
import { clearRectangle, drawRectangle } from './player.js';
import { store } from '../redux/store.js';

export function resetWholeGame(triggerSocket) {
	usersReset();
	resetBall();
	resetGameButton();
	if (triggerSocket) {
		store.socket.emit('resetWholeGame');
	}
}

export function resetBall() {
	const {
		canvasHeight,
		canvasWidth,
		defaultSpeed,
		ballEdges: edges,
	} = configurations;
	const { circle } = store;
	const { ctx } = circle;

	store.speed = defaultSpeed;
	circle.x = canvasWidth / 2;
	circle.y = canvasHeight / 2;
	clearBallArea(ctx, edges);
	paint(ctx, circle);
}

function userReset(user) {
	const { canvasHeight, rectangle } = configurations;
	user.y = canvasHeight / 2 - rectangle.height / 2;
	clearRectangle(user);
	drawRectangle(user);
}

function usersReset() {
	const users = getUsers();
	users.forEach((user) => userReset(user));
}

function resetGameButton() {
	document.getElementById('gameBtn').classList.replace('stop', 'ready');
	document.getElementById('gameBtn').innerText = 'Ready';
	document.getElementById('gameBtn').style.visibility = 'visible';
	document.getElementById('description').classList.remove('display_none');
	document.getElementById('description').innerHTML = 'Please start the game';
	store.isReady = false;
}
