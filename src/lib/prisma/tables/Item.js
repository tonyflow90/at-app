import prisma from '$lib/prisma/prisma';

const table = 'item';

export let updateItem = async (id, data) => {
	return new Promise(async (res, rej) => {
		try {
			let result = await prisma[table].update({
				where: {
					id
				},
				data
			});
			res(result);
		} catch (error) {
			rej(error);
		}
	});
};

export let createItem = async (data) => {
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
// return await prisma.journalTransactions.findMany({
//     where: {
//       date: {
//         lte: 2022-01-30,
//         gte: 2022-01-15,
//       },
//     },
//   });

export async function get(id) {
	return new Promise(async (res, rej) => {
		try {
			let results = await prisma.item.findUnique({
				where: {
					id
				}
			});
			res(results);
		} catch (error) {
			rej(error);
		}
	});
}

export async function getLatestItem(activityId) {
	return new Promise(async (res, rej) => {
		try {
			let results = await prisma.item.findFirst({
				where: {
					activityId
				},
				orderBy: {
					id: 'desc'
				}
			});
			res(results);
		} catch (error) {
			rej(error);
		}
	});
}

export async function getAll() {
	return new Promise(async (res, rej) => {
		try {
			let results = await prisma.item.findMany();
			res(results);
		} catch (error) {
			rej(error);
		}
	});
}

//content: { not: null },

export async function getAllWithFilter(filter) {
	return new Promise(async (res, rej) => {
		try {
			let results = await prisma.item.findMany({
				where: {
					...filter
				}
			});
			res(results);
		} catch (error) {
			rej(error);
		}
	});
}

export async function create(data) {
	return new Promise(async (res, rej) => {
		try {
			const { activityId, start } = Object.fromEntries(data);

			let d = {
				...(activityId && { activityId }),
				...(start && { start: new Date(start) })
			};

			let result = await prisma.item.create({
				data: d
			});
			res(result);
		} catch (error) {
			rej(error);
		}
	});
}

export async function update(data) {
	return new Promise(async (res, rej) => {
		try {
			const { id, start, end } = Object.fromEntries(data);
			let d = {
				...(start && { start: new Date(start) }),
				...(end && { end: new Date(end) })
			};

			let result = await prisma.item.update({
				where: {
					id: id
				},
				data: d
			});
			res(result);
		} catch (error) {
			rej(error);
		}
	});
}

export async function addActivity(data) {
	return new Promise(async (res, rej) => {
		try {
			rej();

			const { title, start } = Object.fromEntries(data);
			let a = {
				...(title && { title })
			};
			let result = await prisma.activity.create({
				data: a
			});

			if (start) {
				let i = {
					activityId: result.id,
					start: new Date(start)
				};
				let item = await prisma.item.create({
					data: i
				});
			}
			res(result);
		} catch (error) {
			rej(error);
		}
	});
}
