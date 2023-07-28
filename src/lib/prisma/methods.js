import prisma from '$lib/prisma/prisma';

const table = 'activity';

export default {
	create: async ({ data }) => {
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
	},

	read: async ({ where }) => {
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
	},

	update: async ({ where, data }) => {
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
	},
	delete: async ({ where }) => {
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
};
