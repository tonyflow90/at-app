import prisma from '$lib/prisma/prisma';

const table = 'activity';

export let createActivity = async (data) => {
	return new Promise(async (res, rej) => {
		try {
			let result = await prisma[table].create({
				data
			});
			res(result);
		} catch (error) {
			rej(error);
		}
	});
};

export let readAll = async () => {
	return new Promise(async (res, rej) => {
		try {
			let result = await prisma[table].findMany();
			res(result);
		} catch (error) {
			rej(error);
		}
	});
};
export let read = async ({ where, include }) => {
	return new Promise(async (res, rej) => {
		try {
			let result = await prisma[table].findMany({
				where,
				include
			});
			res(result);
		} catch (error) {
			rej(error);
		}
	});
};

export let update = async ({ where, data }) => {
	return new Promise(async (res, rej) => {
		try {
			let result = await prisma[table].update({
				where,
				data
			});
			res(result);
		} catch (error) {
			rej(error);
		}
	});
};

export let remove = async ({ where }) => {
	return new Promise(async (res, rej) => {
		try {
			let result = await prisma[table].delete({
				where,
				data
			});
			res(result);
		} catch (error) {
			rej(error);
		}
	});
};
