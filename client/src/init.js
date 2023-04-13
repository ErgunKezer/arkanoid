import { canvas, canvasWidth, canvasHeight, defaultSpeed } from './model.js';
import { paint } from './circle.js';
import { getUsers } from './user.js';
import { drawRectangle } from './rectangle.js';

export function init(globals) {
	const { circle, rectangle } = globals;
	const { ctx } = circle;
	globals.speed = defaultSpeed;
	circle.x = canvasWidth / 2;
	circle.y = canvasHeight / 2;
	const users = getUsers();
	paint(ctx, circle);
	users.forEach((user) => {
		drawRectangle(user, globals.rectangle);
	});
}
