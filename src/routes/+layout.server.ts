import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ url, locals: { getSession } }) => {
  const session = await getSession();
  if (!session) {
    const path = url.pathname;
    
    if (!path.includes('/authentication')) throw redirect(302, '/authentication');
    else return {}
  }

  return {
    session: session
  };
};