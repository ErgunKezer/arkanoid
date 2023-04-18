import { store } from '../redux/store.js';
import { configurations } from '../configurations/configurations.js';
export function generateUser(isFirstUser) {
	const { canvas } = store;
	const { rectangle } = configurations;
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

const defUsers = [generateUser(true), generateUser(false)];

export function getUsers() {
	return defUsers;
}

export function updateUser(index, user, users = defUsers) {
	const { canvas } = store;
	users[index] = generateUserByUpdate(canvas, user);
	return users[index];
}

function generateUserByUpdate(canvas, user) {
	return {
		...user,
		ctx: canvas.getContext('2d'),
	};
}
