import { canvasWidth, canvasHeight, defaultSpeed } from './model.js';
import { paint } from './circle.js';
import { getUsers } from './user.js';
import { clearRectangle, drawRectangle } from './rectangle.js';
import { globals } from './model.js';

export function resetWholeGame(globals, triggerSocket, direction) {
	usersReset(globals);
	resetBall(direction);
	if (triggerSocket) {
		globals.socket.emit('resetWholeGame');
	}
}

function getCircleAndCtx(globals) {
	const { circle } = globals;
	const { ctx } = circle;
	return { circle, ctx };
}

export function resetBall(direction) {
	const { ctx, circle } = getCircleAndCtx(globals);
	globals.speed = defaultSpeed;
	circle.x = canvasWidth / 2;
	circle.y = canvasHeight / 2;
	if (direction) {
		circle.direction.x = direction.x;
		circle.direction.y = direction.y;
	}
	paint(ctx, circle);
}

function userReset(user, globals) {
	user.y = canvasHeight / 2 - globals.rectangle.height / 2;
	clearRectangle(user);
	drawRectangle(user, globals.rectangle);
}

function usersReset(globals) {
	const users = getUsers();
	users.forEach((user) => userReset(user, globals));
}
