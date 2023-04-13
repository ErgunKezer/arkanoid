import { canvasWidth, canvasHeight, defaultSpeed } from './model.js';
import { paint } from './circle.js';
import { getUsers } from './user.js';
import { clearRectangle, drawRectangle } from './rectangle.js';

export function reset(ctx, circle, globals) {
	globals.speed = defaultSpeed;
	circle.x = canvasWidth / 2;
	circle.y = canvasHeight / 2;
	const users = getUsers();
	paint(ctx, circle);
	users.forEach((user) => {
		user.y = canvasHeight / 2 - globals.rectangle.height / 2;
		clearRectangle(user);
		drawRectangle(user, globals.rectangle);
	});
}
