<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$components/ui/card';
	import { Input } from '$components/ui/input';
	import { Label } from '$components/ui/label';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$components/ui/tabs';

	import {
		Table,
		TableBody,
		TableCaption,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$components/ui/table';

	import { Check, Loader2, Play, Plus, StopCircle } from 'lucide-svelte';
	import { Watch } from 'lucide-svelte';

	import { Button } from '$components/ui/button';
	import type { PageData } from './$types';

	import Timer from '$components/custom/timer/Timer.svelte';
	import Form from '$components/custom/form/Form.svelte';
	import Bar from '$components/custom/charts/Bar.svelte';
	import Carousel from '$components/custom/carousel/Carousel.svelte';
	import BarChart from '$components/custom/charts/BarChart.svelte';

	export let data: PageData;

	let tabs = [
		{ key: 'running', name: 'Running', filter: {} },
		{ key: 'today', name: 'Today', filter: {} },
		{ key: 'month', name: 'Month', filter: {} },
		{ key: 'year', name: 'Year', filter: {} },
		{ key: 'all', name: 'All', filter: {} }
	];
	let selectedTab = 'running';

	// const addTimes = (items) => {
	// 	return items.map((r) => {
	// 		r.items = r.items.map((i) => {
	// 			if (i.start && i.end) i['time'] = i.end - i.start;
	// 			else i['time'] = 0;
	// 			return i;
	// 		});

	// 		let times = r.items.map((i) => {
	// 			return i.time;
	// 		});

	// 		if (times.length > 0) r['time'] = times.reduce((x, y) => x + y);
	// 		else r['time'] = 0;
	// 		return r;
	// 	});
	// };

	// const resolvePromise = async (promise) => {
	// 	let results = await promise;

	// 	let items = addTimes(results);

	// 	let act = {};
	// 	tabs.forEach((tab) => (act[tab.key] = { items: [], time: 0 }));

	// 	const cDate = new Date().getDate();
	// 	const cMonth = new Date().getMonth();
	// 	const cYear = new Date().getFullYear();

	// 	act['running'] = items.filter((a) => a.items.length > 0 && a.items[0].end === null);

	// 	act['today'] = items.filter((a) => {
	// 		if (
	// 			a.items.length > 0 &&
	// 			a.items[0].start.getDate() === cDate &&
	// 			a.items[0].start.getMonth() === cMonth &&
	// 			a.items[0].start.getFullYear() === cYear
	// 		) {
	// 			return true;
	// 		} else return null;
	// 	});

	// 	act['month'] = items.filter((a) => {
	// 		if (
	// 			a.items.length > 0 &&
	// 			a.items[0].start.getMonth() === cMonth &&
	// 			a.items[0].start.getFullYear() === cYear
	// 		) {
	// 			return true;
	// 		} else return null;
	// 	});

	// 	act['year'] = items.filter((a) => {
	// 		if (a.items.length > 0 && a.items[0].start.getFullYear() === cYear) {
	// 			return true;
	// 		} else return null;
	// 	});

	// 	act['all'] = items;

	// 	return act;
	// };

	// $: activities = resolvePromise(data.activities);
	// $: activitiesWithItems = resolvePromise(data.activitiesWithItems);

	// const makeArray = (items) => {
	// 	let arr = items.map((i) => {
	// 		return { title: i.title, time: i.time };
	// 	});
	// 	return arr.filter((i) => i.time > 0);
	// 	// return [
	// 	// 	{ x: '1', y: 100 },
	// 	// 	{ x: '2', y: 200 },
	// 	// 	{ x: '3', y: 200 }
	// 	// ];
	// };

	import { blur } from 'svelte/transition';

	import CreateDialog from '$components/CreateDialog.svelte';
	import Donut from '$components/custom/charts/Donut.svelte';
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="description" content="Dashboard" />
</svelte:head>

<div class="flex flex-col md:flex">
	<div class="flex-1 space-y-4 p-4 pt-6">
		<div class="flex items-center justify-between space-y-2">
			<h2 class="text-xl md:text-3xl font-bold tracking-tight">Activity Dashboard</h2>
			<div class="flex items-center space-x-2">
				<CreateDialog />
			</div>
		</div>

		<!-- <button
			style="background-color: red;"
			on:click={() => (selected = !selected)}
			in:receive={{ key: 1 }}
			out:send={{ key: 1 }}
			>...
		</button>

		{#if selected}
			<div
				on:click={() => (selected = !selected)}
				class="flex absolute z-50 m-0 p-0 space-y-0 top-0 left-0 w-full h-full bg-orange-600"
				in:scale
				out:blur={{ duration: 5000, amount: 5 }}
			/>
		{/if} -->

		{#await activities then items}
			<Carousel items={tabs} auto={false} horizontal={true}>
				<div slot="item" let:item in:blur>
					<Card class="w-96">
						<CardHeader class="flex">
							<CardTitle class="text-lg font-medium">{item.name}</CardTitle>
						</CardHeader>
						<CardContent class="flex items-center justify-center w-full h-auto">
							<Donut class="w-96 h-96" data={makeArray(items[item.key])} />
							<!-- {#each a[item.key] as i}
								{i.title}
								{i.time}
							{/each} -->
						</CardContent>
					</Card>
				</div>
			</Carousel>
		{/await}

		<Tabs bind:value={selectedTab} class="space-y-4">
			<TabsList>
				{#each tabs as tab, i}
					<TabsTrigger value={tab.key}>
						<p on:click={(selectedTab = tab.key)}>{tab.name}</p>
					</TabsTrigger>
				{/each}
			</TabsList>
			{#await activities}
				<Loader2 class="mr-2 h-4 w-4 animate-spin" />
			{:then activities}
				{#each tabs as tab, i}
					<TabsContent value={tab.key} class="space-y-4">
						<Table class="w-full">
							<TableCaption>{tab.name}</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead>Status</TableHead>
									<TableHead>Title</TableHead>
									<TableHead>Time</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{#each activities[tab.key] as activity, i}
									<TableRow key={activity.id} href="/">
										<TableCell class="flex justify-start text-left">
											{#if activity.items.length > 0}
												{#if activity.items[0].start && !activity.items[0].end}
													<Form
														action="?/stopActivityItem"
														data={{ id: activity.items[0].id, end: new Date() }}
													>
														<StopCircle />
													</Form>
													<!-- {:else if !activity.items[0].start && !activity.items[0].end}
													<Form
														action="?/updateActivityItem"
														data={{ id: activity.items[0].id, start: new Date() }}
													>
														<Play />
													</Form> -->
												{:else}
													<Form
														action="?/startNewActivityItem"
														data={{ activityId: activity.id, start: new Date() }}
													>
														<Plus />
													</Form>
												{/if}
											{:else}
												<Form
													action="?/startNewActivityItem"
													data={{ activityId: activity.id, start: new Date() }}
												>
													<Plus />
												</Form>
											{/if}
										</TableCell>
										<TableCell class="font-medium">{activity.title}</TableCell>
										<TableCell>
											{#if activity.items.length > 0}
												{#each activity.items as item}
													{#if item.start}
														<Timer startAt={item.start} endAt={item.end} />
													{:else}
														<Timer />
													{/if}
												{/each}
											{/if}
										</TableCell>
									</TableRow>
								{/each}
							</TableBody>
						</Table>
					</TabsContent>
				{/each}
			{:catch error}
				<p>{error} ...</p>
			{/await}
		</Tabs>
	</div>
</div>
