import { configurations } from '../configurations/configurations.js';
import { paint } from './ball.js';
import { getUsers } from './user.js';
import { drawRectangle } from './player.js';
import { store } from '../redux/store.js';
export function init() {
	const { canvasWidth, canvasHeight, rectangle, defaultSpeed } = configurations;
	const { circle } = store;
	const { ctx } = circle;

	store.speed = defaultSpeed;
	circle.x = canvasWidth / 2;
	circle.y = canvasHeight / 2;
	const users = getUsers();
	paint(ctx, circle);
	users.forEach((user) => {
		drawRectangle(user, rectangle);
	});
}
