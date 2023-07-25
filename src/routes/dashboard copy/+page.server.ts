import type { PageServerLoad } from "./$types";
import prisma from "$lib/prisma/prisma";
import { add, update } from "$lib/prisma/methods";

export const load: PageServerLoad = async (event) => {
    return {
        activities: {
            result: loadActivities()
        },
    };
};

const loadActivities = async () => {
    return new Promise(async (res, rej) => {
        try {
            let results = await prisma.activities.findMany()
            res(results)
        } catch (error) {
            rej(error)
        }
    });
}

export const actions: Actions = {
    addActivity: async ({ request }) => add(await request.formData()),
    updateActivity: async ({ request }) => update(await request.formData()),
};