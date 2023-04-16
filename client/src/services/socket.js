import { io } from 'socket.io-client';
import { SOCKET_URL } from '../constants/index.js';

const socketSrv = () => {
	let _instance;

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
