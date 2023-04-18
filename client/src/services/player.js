import { store } from '../redux/store.js';
import { configurations } from '../configurations/configurations.js';

export function clearRectangle(user) {
	const { canvasHeight } = configurations;
	user.ctx.clearRect(user.clearStartPoint, 0, user.clearWidth, canvasHeight);
}

export function drawRectangle(user) {
	const { rectangle } = configurations;
	const { ctx, color, x, y } = user;
	const { width, height } = rectangle;
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.fillRect(x, y, width, height);
	ctx.stroke();
}

function moveVertical(user, isUp) {
	const { rectangle, canvasHeight } = configurations;
	const verticalPosition = user.y;
	if (isUp && verticalPosition !== 0) {
		user.y = verticalPosition <= 5 ? 0 : verticalPosition - 5;
	} else if (!isUp && verticalPosition + rectangle.height !== canvasHeight) {
		user.y =
			verticalPosition + rectangle.height + 5 > canvasHeight
				? canvasHeight - rectangle.height
				: verticalPosition + 5;
	}
}

export function reDrawVertical(user, isUp, triggerSocket) {
	clearRectangle(user);
	moveVertical(user, isUp);
	drawRectangle(user);
	if (triggerSocket) {
		store.socket.emit('playerMove', user);
	}
}

export function reDrawWithoutCalculationVertical(user) {
	clearRectangle(user);
	drawRectangle(user);
}
