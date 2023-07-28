import { createActivity } from '$lib/prisma/tables/activity';
import { createItem } from '$lib/prisma/tables/item';
import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
    signout: async ({ locals, request }) => {
        const { error } = await locals.supabase.auth.signOut();

        if (error) {
            if (error?.message) return fail(500, { message: error.message })
            return fail(500, { message: error })
        }
        return {
            status: 201, message: 'signout success'
        };
    },
    createActivity: async ({ request }) => {
        const formData = await request.formData();
        const { title, start } = Object.fromEntries(formData);

        if (!title) return fail(500, { message: 'no title' })

        let activityData = {
            ...(title && { title }),
        };
        let activity = await createActivity(activityData);
        const { error } = activity;
        if (error) fail(500, { message: error })

        if (start) {
            let itemData = {
                ...(activity && { activityId: activity.id }),
                ...(start && { start: new Date(start) }),
            };
            let item = await createItem(itemData);
            const { error } = item;
            if (error) fail(500, { message: error })
        }

        return {
            status: 201, message: 'creating new activity'
        };
    },
    startActivity: async ({ request }) => add(await request.formData()),
};