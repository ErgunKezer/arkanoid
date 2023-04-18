import { configurations } from '../configurations/configurations.js';

const canvasSrv = () => {
	let _instance;
	const { canvasHeight, canvasWidth } = configurations;

	const setInstance = () => {
		_instance = document.getElementById('arkanoid');
		_instance.width = canvasWidth;
		_instance.height = canvasHeight;
	};

	return () => {
		if (!_instance) {
			setInstance();
		}
		return _instance;
	};
};

export function getCanvas() {
	const hoc = canvasSrv();
	return hoc();
}
