import prisma from "$lib/prisma/prisma";

export async function getAllActivities() {
    return new Promise(async (res, rej) => {
        try {
            let results = await prisma.activity.findMany({
                include: {
                    items: true
                }
            });
            res(results)
        } catch (error) {
            rej(error)
        }
    });
}

export async function getActivitiesWithLatestItem() {
    return new Promise(async (res, rej) => {
        try {
            let results = await prisma.activity.findMany({
                include: {
                    items: {
                        orderBy: {
                            id: 'desc',
                        },
                        take: 1,
                    },
                }
            });
            res(results)
        } catch (error) {
            rej(error)
        }
    });
}

export async function addActivityItem(data: FormData) {
    return new Promise(async (res, rej) => {
        try {
            const { activityId, start } = Object.fromEntries(data);

            let d = {
                ...(activityId && { activityId }),
                ...(start && { start: new Date(start) }),
            };

            let result = await prisma.item.create({
                data: d
            });
            res(result)
        } catch (error) {
            rej(error)
        }
    });
}

export async function updateActivityItem(data: FormData) {
    return new Promise(async (res, rej) => {
        try {
            const { id, start, end } = Object.fromEntries(data);
            let d = {
                ...(start && { start: new Date(start) }),
                ...(end && { end: new Date(end) }),
            };

            let result = await prisma.item.update({
                where: {
                    id: id
                },
                data: d
            });
            res(result)
        } catch (error) {
            rej(error)
        }
    });
}

export async function addActivity(data: FormData) {
    return new Promise(async (res, rej) => {
        try {
            rej()
            
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
            res(result)
        } catch (error) {
            rej(error)
        }
    });
}