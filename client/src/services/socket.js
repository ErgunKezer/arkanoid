import { io } from 'socket.io-client';
import { configurations } from '../configurations/configurations.js';

const socketSrv = () => {
	let _instance;
	const { SOCKET_URL } = configurations;

	const setInstance = () => {
		_instance = io(SOCKET_URL);
	};

	return () => {
		if (!_instance) {
			setInstance();
		}
		return _instance;
	};
};

export function getSocket() {
	const hoc = socketSrv();
	return hoc();
}
