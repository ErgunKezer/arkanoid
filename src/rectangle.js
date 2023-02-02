export function clearRectangle(canvas, user) {
	user.ctx.clearRect(user.clearStartPoint, 0, user.clearWidth, canvas.height);
}

export function drawRectangle(user, rect) {
	const { ctx, color, x, y } = user;
	const { width, height } = rect;
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.fillRect(x, y, width, height);
	ctx.stroke();
}

export function moveVertical(canvas, user, rect, isUp) {
	const verticalPosition = user.y;
	if (isUp && verticalPosition !== 0) {
		user.y = verticalPosition <= 5 ? 0 : verticalPosition - 5;
	} else if (!isUp && verticalPosition + rect.height !== canvas.height) {
		user.y =
			verticalPosition + rect.height + 5 > canvas.height
				? canvas.height - rect.height
				: verticalPosition + 5;
	}
}

export function reDrawVertical(canvas, user, rect, isUp) {
	clearRectangle(canvas, user);
	moveVertical(canvas, user, rect, isUp);
	drawRectangle(user, rect);
}
