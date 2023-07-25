import prisma from "$lib/prisma/prisma";
import { fail } from '@sveltejs/kit';

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
            let d = Object.assign({},
                activityId && { activityId },
                start && { start: new Date(start) }
            );
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

            let d = Object.assign({},
                start && { start: new Date(start) },
                end && { start: new Date(end) }
            );
            let result = await prisma.item.update({
                where: {
                    id: id
                },
                data: d
            });
            
            console.log(result);
            
            res(result)
        } catch (error) {
            rej(error)
        }
    });
}

export async function addActivity(data: FormData) {
    return new Promise(async (res, rej) => {
        try {
            const { title, start } = Object.fromEntries(data);
            let a = Object.assign({},
                title && { title },
            );
            let result = await prisma.activity.create({
                data: a
            });

            if (start) {
                let i = Object.assign({
                    activity: activity.id,
                    start: new Date()
                });
                let item = await prisma.item.create({
                    data: i
                });
            }
            res(result)
        } catch (error) {
            fail(500, { message: 'update error', error })
            rej(error)
        }
    });
}

export async function update(data: FormData) {
    try {
        const { id, title, started_at, finished_at } = Object.fromEntries(data);

        let d = Object.assign({},
            title && { title },
            started_at && { started_at: new Date(started_at) },
            finished_at && { finished_at: new Date(finished_at) },
        );

        console.log(d);

        await prisma.activity.update({
            where: {
                id: id
            },
            data: d
        });
    } catch (error) {
        return fail(500, { message: 'update error', error })
    }

    return {
        status: 201
    }
}