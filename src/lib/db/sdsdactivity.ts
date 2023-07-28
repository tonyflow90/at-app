export type Activity = {
    id?: number;
    title: string,
    created_at: Date,
    started_at?: Date,
    finished_at?: Date,
};


let activities: Activity[] = Array.from({ length: 10 }, (_, i) => {
    return {
        id: i,
        title: `Act${i}`,
        created_at: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
        started_at: new Date(Date.now() - Math.floor(Math.random() * 10000000)),
        finished_at: Math.floor(Math.random() * 1000) % 2 != 0 ? new Date(Date.now() + Math.floor(Math.random() * 10000000)) : undefined,
    }
});

export async function getAll(): Promise<Activity[]> {
    return new Promise((res, rej) => {
        try {
            let results: Activity[] = activities;
            res(results)
        } catch (error) {
            rej(error)
        }
    });
}

export async function get(id: number): Promise<Activity> {
    return new Promise((res, rej) => {
        try {
            let result = activities.find(a => a.id === id);
            const newActivity = activities.map(obj => {
                if (obj.id === id) return obj;
            })
            res(result)
        } catch (error) {
            rej(error)
        }
    });
}

export async function add(activity: Activity): Promise<Activity> {
    return new Promise((res, rej) => {
        try {
            let results: Activity[] = [...activities, activity]
            setTimeout(_ => res(activity), 1000)
        } catch (error) {
            rej(error)
        }
    });
}

export async function update(activity: Activity): Promise<Activity> {
    return new Promise((res, rej) => {
        try {
            const results = activities.map(obj => {
                if (obj.id === activity.id) obj = activity;
                return obj;
            })
            activities = results;
            setTimeout(_ => res(activity), 1000)
        } catch (error) {
            rej(error)
        }
    });
}