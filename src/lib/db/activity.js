const table = 'Activity';

export async function getAllActivities(supabaseClient, select = '*') {
	return supabaseClient.from(table).select(select);
	// return new Promise(async (res, rej) => {
	//     try {
	//         let { data, error } = await supabaseClient.from(table).select(select);
	//         res(data)
	//     } catch (error) {
	//         rej(error)
	//     }
	// });
}
