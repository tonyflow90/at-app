import type { PageServerLoad } from "./$types";
import { addActivity, getAllActivities, getActivitiesWithLatestItem, addActivityItem, updateActivityItem } from "$lib/prisma/methods";
import { fail } from "@sveltejs/kit";
import { getAllWithFilter } from "$lib/prisma/tables/Item";


let getFristDay = (year, month) => {
    return new Date(year, month, 1);
}
let getLastDay = (year, month) => {
    return new Date(year, month + 1, 0);
}
const filter1 = { end: { not: null } }
const filter2 = {
    start: {
        lte: getFristDay(2023, 7),
        gte: getLastDay(2023, 7),
    }
}


export const load: PageServerLoad = async (event) => {
    return {
        activitiesWithItems: loadActivitiesWithItems(),
        activities: loadActivities(),
        items1: getAllWithFilter(filter1),
        items2: getAllWithFilter(filter2),
    };
};

const loadActivities = async () => {
    return new Promise(async (res, rej) => {
        try {
            let results = await getAllActivities()
            res(results)
        } catch (error) {
            rej(error)
        }
    });
}

const loadActivitiesWithItems = async () => {
    return new Promise(async (res, rej) => {
        try {
            let results = await getActivitiesWithLatestItem()

            let promises = []
            results.forEach(res => {
                res.items = getAllWithFilter({ activityId: res.id })
                // promises.push(getAllWithFilter({ activitiyId: res.id }))
            });
            res(results)
        } catch (error) {
            rej(error)
        }
    });
}

export const actions: Actions = {
    createActivity: async ({ request }) => {
        const data = await request.formData();
        const { title } = Object.fromEntries(data);

        if (!title) return fail(500, { message: 'no title' })

        let error = await addActivity(data);
        console.log(error);

        if (error) fail(500, { message: error })

        return {
            status: 201, message: 'creating new activity'
        };
    },
    createActivityItem: async ({ request }) => addActivityItem(await request.formData()),
    stopActivityItem: async ({ request }) => {
        const data = await request.formData();
        const { id, end } = Object.fromEntries(data);

        if (!id) return fail(500, { message: 'no id' })
        if (!end) return fail(500, { message: 'no end date' })

        let error = await updateActivityItem(data);

        if (error) fail(500, { message: error })

        return {
            status: 201, message: 'activity item stopped'
        };
    },
    startNewActivityItem: async ({ request }) => {
        const data = await request.formData();
        const { id, start } = Object.fromEntries(data);

        // if (!id) return fail(500, { message: 'no id' })
        if (!start) return fail(500, { message: 'no start date' })

        let error = await addActivityItem(data);

        if (error) fail(500, { message: error })

        return {
            status: 201, message: 'new activity item started'
        };
    },
};