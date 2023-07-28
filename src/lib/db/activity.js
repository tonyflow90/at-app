const table = 'Activity';

export async function getActivities(supabase, select = '*') {
	return supabase.from(table).select(select);
	// return new Promise(async (resolve, reject) => {
	//     try {
	//         let { data, error } = await supabase.from(table).select(select);
	//         resolve(data)
	//     } catch (error) {
	//         reject(error)
	//     }
	// });
}

export async function getAllActivities(supabase, select = '*') {
	let { data: activity, error } = await supabase.from('activity').select(`
    some_column,
    other_table (
      foreign_key
    )
  `);
	return supabase.from(table).select(select);
	// return new Promise(async (resolve, reject) => {
	//     try {
	//         let { data, error } = await supabase.from(table).select(select);
	//         resolve(data)
	//     } catch (error) {
	//         reject(error)
	//     }
	// });
}

export async function createActivity(supabase, activityData) {
	return new Promise(async (resolve, reject) => {
		try {
			// console.log([activityData]);
			// const { data, error } = await supabase.from(table).insert([activityData]).select();
			const { data, error } = await supabase.from('activity').upsert(activityData).select();
			// console.log([activityData]);
			console.log(data, error);
			if (error) reject(error);
			resolve(data);
		} catch (error) {
			reject(error);
		}
	});
}
