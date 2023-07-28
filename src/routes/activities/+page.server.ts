import { invalidate } from "$app/navigation";
import { getAll, getAllActivities } from "$lib/db/activity";
import type { PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";



export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    return {
        activities: loadActivities(supabase),
        activitiesWithItems: loadActivitiesWithItems(),
    };
};

const loadActivitiesWithItems = async () => {
    return new Promise(async (res, rej) => {
        try {
            console.log('reload with items hello');

            let include = {
                items: true
            };
            let results = await read({ include })
            res(results)
        } catch (error) {
            rej(error)
        }
    });
}

const loadActivities = async (supabaseClient) => {
    return new Promise(async (res, rej) => {
        try {
            // let results = await readAll();
            let results = await getAllActivities(supabaseClient);
            console.log(results);
            
            res(results)
        } catch (error) {
            rej(error)
        }
    });
}

export const actions: Actions = {
    updateActivityItem: async ({ request }) => {
        const formData = await request.formData();
        const { id, end } = Object.fromEntries(formData);

        if (!id) return fail(500, { message: 'no item id' })
        if (!end) return fail(500, { message: 'no start date' })

        let itemData = {
            ...(end && { end: new Date(end) }),
        };
        let item = await updateItem(id, itemData);
        const { error } = item;
        if (error) fail(500, { message: error })

        if (error) fail(500, { message: error })

        return {
            status: 201, message: 'activity item stopped'
        };
    },
    createActivityItem: async ({ request }) => {
        const formData = await request.formData();
        const { activityId, start } = Object.fromEntries(formData);

        if (!activityId) return fail(500, { message: 'no activity id' })
        if (!start) return fail(500, { message: 'no start date' })

        let itemData = {
            ...(activityId && { activityId }),
            ...(start && { start: new Date(start) }),
        };
        let item = await createItem(itemData);
        const { error } = item;
        if (error) fail(500, { message: error })

        return {
            status: 201, message: 'new activity item started'
        };
    },
};