import { readyStatus } from '../memory/memory.js';
export const resetGame = (io) => {
	Object.keys(readyStatus).forEach((key) => (readyStatus[key] = false));
	io.sockets.emit('resetWholeGame');
};
