import { createSupabaseLoadClient } from "@supabase/auth-helpers-sveltekit"


export async function get(): Promise<any[]> {
    return new Promise<any>((resolve, reject) => {
        let { data: activities, error } = await createSupabaseLoadClient supabase
        .from('activities')
        .select('id')
      
        
    })
}

let { data: activities, error } = await supabase
  .from('activities')
  .select('*')