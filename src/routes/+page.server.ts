import { add } from "$lib/prisma/methods";
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
    addActivity: async ({ request }) => add(await request.formData()),
};