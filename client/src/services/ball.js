import { resetWholeGame } from './reset.js';
import { getUsers } from './user.js';
import { store } from '../redux/store.js';
import { configurations } from '../configurations/configurations.js';

function isInRectRange(user, circle, rectangle) {
	return circle.y >= user.y && circle.y <= user.y + rectangle.height;
}

export function clearBallArea(ctx, edges) {
	ctx.clearRect(
		edges.x.start,
		edges.y.start,
		edges.x.clearWidth,
		edges.y.clearHeight
	);
}

export function setCircleDirection(direction) {
	let { speed, circle, isFirst } = store;
	circle.direction = direction;
}

export function paint(ctx, circle) {
	ctx.beginPath();
	ctx.arc(circle.x, circle.y, 20, 0, Math.PI * 2);
	ctx.fillStyle = 'yellow';
	ctx.fill();
}

export function drawCircle() {
	let { speed, circle, isFirst } = store;
	const { ctx } = circle;
	const { ballEdges: edges, rectangle } = configurations;

	clearBallArea(ctx, edges);

	const users = getUsers();
	const user = users[store.userIndex];

	// horizontal calculation
	if (circle.x - circle.radius === edges.x.start) {
		if ((isInRectRange(user, circle, rectangle) && isFirst) || !isFirst) {
			circle.x += speed;
			circle.direction.x = 1;
			speed++;
		} else {
			return resetWholeGame(true);
		}
	} else if (circle.x + circle.radius === edges.x.end) {
		if ((isInRectRange(user, circle, rectangle) && !isFirst) || isFirst) {
			circle.x -= speed;
			circle.direction.x = 0;
			speed++;
		} else {
			return resetWholeGame(true);
		}
	} else {
		circle.x = circle.direction.x ? circle.x + speed : circle.x - speed;
		if (circle.x + circle.radius >= edges.x.end) {
			circle.x = edges.x.end - circle.radius;
			circle.direction.x = 0;
		} else if (circle.x - circle.radius < edges.x.start) {
			circle.x = edges.x.start + circle.radius;
			circle.direction.x = 1;
		}
	}

	// vertical calculation
	if (circle.y === circle.radius && circle.direction.y) {
		circle.direction.y = 0;
		circle.y += speed;
	} else if (circle.y + circle.radius === edges.y.end) {
		circle.direction.y = 1;
		circle.y -= speed;
	} else {
		circle.y = circle.direction.y ? circle.y - speed : circle.y + speed;
		if (
			circle.y <= circle.radius ||
			circle.y + circle.radius <= edges.y.start
		) {
			circle.y = edges.y.start + circle.radius;
			circle.direction.y = 0;
		} else if (circle.y + circle.radius >= edges.y.end) {
			circle.y = edges.y.end - circle.radius;
			circle.direction.y = 1;
		}
	}
	store.speed = speed;
	paint(ctx, circle);
}
