const moment = require('moment');

export const uid = () => {
	return '_' + Math.random().toString(36).substr(2, 9);
};

export const colors = [
	'#fc5c65',
	'#fd9644',
	'#fed330',
	'#26de81',
	'#2bcbba',
	'#45aaf2',
	'#a55eea'
];

export const randomColor = () => {
	return colors[Math.floor(Math.random() * colors.length)];
};

export const groupBy = function (xs, key) {
	return xs.reduce(function (rv, x) {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {});
};

export const range = (start, end) => {
	const dates = [];
	const startDate = moment(start).startOf('day');
	const endDate = moment(end).startOf('day');
	
	while (startDate.diff(endDate) <= 0) {
		dates.push(startDate.clone().toDate());
		startDate.add(1, 'days')
	}
	
	return dates;
};

const str_pad_left = (string, pad, length) => {
	return (new Array(length + 1).join(pad) + string).slice(-length);
};

export const TimeObject = (time) => {
	const minutes = Math.floor(time / 60);
	const seconds = time - minutes * 60;
	const hours = Math.floor(time / 3600);
	
	return `${str_pad_left(hours, '0', 2)}:${str_pad_left(minutes, '0', 2)}:${str_pad_left(seconds, '0', 2)}`;
};
