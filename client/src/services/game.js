import { drawCircle } from './ball';

const gameMiddleware = () => {
	let _instance;
	const startGame = () => {
		_instance = setInterval(drawCircle, 100);
	};
	const stopGame = () => {
		clearInterval(_instance);
	};

	return () => ({
		start: () => startGame(),
		stop: () => stopGame(),
	});
};

export const getGame = () => {
	const game = gameMiddleware();
	return game();
};
