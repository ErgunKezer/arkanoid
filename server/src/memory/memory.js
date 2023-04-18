const ids = ['red', 'blue'];
const idRelations = [
	{
		id: 'red',
		isFirst: true,
	},
	{
		id: 'blue',
		isFirst: false,
	},
];
const idsTaken = [];
const readyStatus = {
	red: false,
	blue: false,
};

export { ids, idRelations, idsTaken, readyStatus };
