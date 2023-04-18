const SOCKET_URL = 'http://localhost:3001/';

const rectangle = {
	width: 20,
	height: 100,
};
const canvasWidth = 700;
const canvasHeight = 500;

export const configurations = {
	rectangle,
	canvasWidth,
	canvasHeight,
	SOCKET_URL,
	defaultSpeed: 5,
	ballEdges: {
		x: {
			start: rectangle.width,
			end: canvasWidth - rectangle.width,
			clearWidth: canvasWidth - 2 * rectangle.width,
		},
		y: {
			start: 0,
			end: canvasHeight,
			clearHeight: canvasHeight,
		},
	},
};
