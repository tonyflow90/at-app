import prisma from '$lib/prisma/prisma';

export let table = 'activity';

export async function create({ data }) {
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
}

export async function read({ where }) {
	return new Promise(async (res, rej) => {
		try {
			let result = await prisma[table].findMany({
				where,
				data
			});
			res(result);
		} catch (error) {
			rej(error);
		}
	});
}

export async function update({ where, data }) {
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
}

export async function delete({ where }) {
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
}
