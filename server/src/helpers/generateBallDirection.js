import { numberGenerator } from './numberGenerator.js';

export const generateBallDirection = () => {
	return {
		x: numberGenerator(0, 1),
		y: numberGenerator(0, 1),
	};
};
