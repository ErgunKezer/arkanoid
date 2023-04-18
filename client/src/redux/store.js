import { getSocket } from '../services/socket.js';
import { getCanvas } from '../services/canvas.js';
import { configurations } from '../configurations/configurations.js';

const { defaultSpeed } = configurations;
const socket = getSocket();
const canvas = getCanvas();

export const store = {
	allIds: [],
	isFirst: false,
	userId: '',
	userIndex: 0,
	rivalIndex: 1,
	isReady: false,
	isStopped: false,
	defaultSpeed: 5,
	socket,
	canvas,
	speed: defaultSpeed,
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
