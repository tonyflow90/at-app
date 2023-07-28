import { fail, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, locals }) => {
    const session = await locals.getSession();

    if (session) {
        const path = url.pathname;
        if (path.includes('/authentication')) throw redirect(302, "/");
        else throw redirect(302, url.pathname);
    }

    return { session };
};

export const actions: Actions = {
    signup: async ({ request }) => {
        const data = await request.formData();
        const { email, password } = Object.fromEntries(data);

        if (!email) return fail(500, { message: 'email is required' })
        if (!password) return fail(500, { message: 'password is required' })
        const { error } = await locals.supabase.auth.signUp({ email, password });

        if (error) {
            if (error?.message) return fail(500, { message: error.message })
            return fail(500, { message: error })
        }
        return {
            status: 201, message: 'signin success'
        };
    }
};