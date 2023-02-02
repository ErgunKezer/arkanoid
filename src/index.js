import { drawRectangle, reDrawVertical } from './rectangle.js';
import { getKeyFromLocalStorage } from './local-storage.js';
import {
	getKeyFromSessionStorage,
	setSessionStorage,
} from './session-storage.js';

const rectangle = {
	width: 30,
	height: 100,
};
const canvas = document.getElementById('arkanoid');
canvas.width = 750;
canvas.height = 500;
const circle = {
	x: 100,
	y: 100,
	radius: 20,
	startAngle: 0,
	endAngle: Math.PI,
	ctx: canvas.getContext('2d'),
	direction: {
		x: 1, // 0 => left, 1: right
		y: 1, // 0 => down, 1: up
	},
};

const ballEdges = {
	x: {
		start: rectangle.width,
		end: canvas.width - rectangle.width,
		clearWidth: canvas.width - 2 * rectangle.width,
	},
	y: {
		start: 0,
		end: canvas.height,
		clearHeight: canvas.height,
	},
};
var users = [
	{
		ctx: canvas.getContext('2d'),
		color: 'red',
		clearStartPoint: 0,
		clearWidth: rectangle.width,
		x: 0,
		y: canvas.height / 2 - rectangle.height / 2,
	},
	{
		ctx: canvas.getContext('2d'),
		color: 'blue',
		clearStartPoint: canvas.width - rectangle.width,
		clearWidth: canvas.width,
		x: canvas.width - rectangle.width,
		y: canvas.height / 2 - rectangle.height / 2,
	},
];

drawRectangle(users[0], rectangle);
drawRectangle(users[1], rectangle);
let speed = 5;

function clearBallArea(circle, edges) {
	circle.ctx.clearRect(
		edges.x.start,
		edges.y.start,
		edges.x.clearWidth,
		edges.y.clearHeight
	);
}

// TODO: move this to circle class
function drawCircle(circle, edges) {
	clearBallArea(circle, edges);
	const { ctx } = circle;
	if (circle.x - circle.radius === edges.x.start) {
		circle.x += speed;
		circle.direction.x = 1;
		speed++;
	} else if (circle.x + circle.radius === edges.x.end) {
		circle.x -= speed;
		circle.direction.x = 0;
		speed++;
	} else {
		circle.x = circle.direction.x ? circle.x + speed : circle.x - speed;
		if (circle.x + circle.radius >= edges.x.end) {
			circle.x = edges.x.end - circle.radius;
			circle.direction.x = 0;
			speed++;
		} else if (circle.x - circle.radius < edges.x.start) {
			circle.x = edges.x.start + circle.radius;
			circle.direction.x = 1;
			speed++;
		}
	}

	if (circle.y === circle.radius && circle.direction.y) {
		circle.direction.y = 0;
		circle.y += speed;
		speed++;
	} else if (circle.y + circle.radius === edges.y.end) {
		circle.direction.y = 1;
		circle.y -= speed;
		speed++;
	} else {
		circle.y = circle.direction.y ? circle.y - speed : circle.y + speed;
		if (
			circle.y <= circle.radius ||
			circle.y + circle.radius <= edges.y.start
		) {
			circle.y = edges.y.start + circle.radius;
			circle.direction.y = 0;
			speed++;
		} else if (circle.y + circle.radius >= edges.y.end) {
			circle.y = edges.y.end - circle.radius;
			circle.direction.y = 1;
			speed++;
		}
	}
	ctx.beginPath();
	ctx.arc(circle.x, circle.y, 20, 0, Math.PI * 2);
	ctx.fillStyle = 'yellow';
	ctx.fill();
}

// TODO: move to init func
setInterval(drawCircle, 100, circle, ballEdges);

document.addEventListener('keydown', (event) => {
	if (event.keyCode === 38) {
		return reDrawVertical(canvas, users[1], rectangle, true);
	}
	if (event.keyCode === 40) {
		return reDrawVertical(canvas, users[1], rectangle, false);
	}
});

const allIds = ['red', 'blue'];

window.addEventListener('load', () => {
	const users = getKeyFromLocalStorage('users', []);
	const ids = getKeyFromLocalStorage('ids', allIds);
	const availableIds = getKeyFromLocalStorage('availableIds', allIds);
	setSessionStorage('id', 'red');
	console.log(users.length);
});

// TODO: create listener and connect two services
window.addEventListener('storage', (event) => {
	console.log(event);
});
