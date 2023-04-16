import { getSocket } from './services/socket.js';

const canvas = document.getElementById('arkanoid');
const canvasWidth = 700;
const canvasHeight = 500;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

const rectangle = {
	width: 20,
	height: 100,
};
const defaultSpeed = 5;

const socket = getSocket();

const globals = {
	allIds: [],
	isFirst: false,
	userId: '',
	userIndex: 0,
	rivalIndex: 1,
	isReady: false,
	isStopped: false,
	socket,
	speed: defaultSpeed,
	rectangle,
	ballEdges: {
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
	},
	center: {},
	circle: {
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
	},
};
export { globals, canvas, canvasWidth, canvasHeight, defaultSpeed };
