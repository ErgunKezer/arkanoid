import { canvasHeight } from './model.js';
import { globals } from './model.js';

export function clearRectangle(user) {
	user.ctx.clearRect(user.clearStartPoint, 0, user.clearWidth, canvasHeight);
}

export function drawRectangle(user, rect) {
	const { ctx, color, x, y } = user;
	const { width, height } = rect;
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.fillRect(x, y, width, height);
	ctx.stroke();
}

export function moveVertical(user, rect, isUp) {
	const verticalPosition = user.y;
	if (isUp && verticalPosition !== 0) {
		user.y = verticalPosition <= 5 ? 0 : verticalPosition - 5;
	} else if (!isUp && verticalPosition + rect.height !== canvasHeight) {
		user.y =
			verticalPosition + rect.height + 5 > canvasHeight
				? canvasHeight - rect.height
				: verticalPosition + 5;
	}
}

export function reDrawVertical(user, rect, isUp, triggerSocket) {
	clearRectangle(user);
	moveVertical(user, rect, isUp);
	drawRectangle(user, rect);
	if (triggerSocket) {
		globals.socket.emit('playerMove', user);
	}
}

export function reDrawWithoutCalculationVertical(user, rect) {
	clearRectangle(user);
	drawRectangle(user, rect);
}
