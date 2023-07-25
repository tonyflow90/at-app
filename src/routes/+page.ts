import { fail, type Actions } from "@sveltejs/kit";
import { add, type Activity } from "$lib/db/activity";

import type { Load } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Load} */
export const load: Load = async () => {
  return {};
}