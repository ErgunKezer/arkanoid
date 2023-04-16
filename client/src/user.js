import { canvas, globals } from './model.js';

export function generateUser(canvas, globals, isFirstUser) {
	const { rectangle } = globals;
	const confs = isFirstUser
		? {
				ctx: canvas.getContext('2d'),
				color: 'red',
				clearStartPoint: 0,
				clearWidth: rectangle.width,
				x: 0,
				y: canvas.height / 2 - rectangle.height / 2,
		  }
		: {
				ctx: canvas.getContext('2d'),
				color: 'blue',
				clearStartPoint: canvas.width - rectangle.width,
				clearWidth: canvas.width,
				x: canvas.width - rectangle.width,
				y: canvas.height / 2 - rectangle.height / 2,
		  };
	return {
		ctx: canvas.getContext('2d'),
		...confs,
	};
}

function generateUserBuUpdate(canvas, user) {
	return {
		...user,
		ctx: canvas.getContext('2d'),
	};
}
const defUsers = [
	generateUser(canvas, globals, true),
	generateUser(canvas, globals, false),
];

export function getUsers() {
	return defUsers;
}

export function updateUser(index, user, users = defUsers) {
	users[index] = generateUserBuUpdate(canvas, user);
	return users[index];
}
