import { fail, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, locals }) => {
    const session = await locals.getSession();

    if (session) {
        const path = url.pathname;
        if (path === '/authentication') throw redirect(302, "/");
        else throw redirect(302, url.pathname);
    }

    return { session };
};