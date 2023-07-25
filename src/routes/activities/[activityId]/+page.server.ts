import { get } from '$lib/db/activity.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const activity = await get(parseInt(params.activityId));

    if (!activity) {
        throw error(404, {
            message: 'Not found'
        });
    }

    return { activity };
}

// import type { PageServerLoad } from "./$types";
// import { addActivity, getActivitiesWithRunningItem, getActivitiesWithLatestItem, addActivityItem, updateActivityItem } from "$lib/prisma/methods";

// export const load: PageServerLoad = async (event) => {
//     return {
//         activities: {
//             result: loadAllActivities()
//         },
//     };
// };

// const loadAllActivities = async () => {
//     return new Promise(async (res, rej) => {
//         try {
//             let results = await getActivitiesWithLatestItem()
//             res(results)
//         } catch (error) {
//             rej(error)
//         }
//     });
// }

// export const actions: Actions = {
//     addActivity: async ({ request }) => addActivity(await request.formData()),
//     createActivityItem: async ({ request }) => addActivityItem(await request.formData()),
//     updateActivityItem: async ({ request }) => updateActivityItem(await request.formData()),
// };