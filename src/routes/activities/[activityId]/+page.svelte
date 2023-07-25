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

	import CreateActivityDialog from '$components/custom/activity/CreateDialog.svelte';
	import Timer from '$components/custom/timer/Timer.svelte';
	import Form from '$components/custom/form/Form.svelte';
	import Bar from '$components/custom/charts/Bar.svelte';
	import Carousel from '$components/custom/carousel/Carousel.svelte';

	export let data: PageData;

	let tabs = [
		{ key: 'running', name: 'Running', filter: {} },
		{ key: 'today', name: 'Today', filter: {} },
		{ key: 'month', name: 'Month', filter: {} },
		{ key: 'year', name: 'Year', filter: {} },
		{ key: 'all', name: 'All', filter: {} }
	];
	let selectedTab = 'today';

	const resolvePromise = async (promise) => {
		let results = await promise;

		let activities = {};
		tabs.forEach((tab) => (activities[tab.key] = []));

		const cDate = new Date().getDate();
		const cMonth = new Date().getMonth();
		const cYear = new Date().getFullYear();

		activities['running'] = results.filter((a) => a.items.length > 0 && a.items[0].end === null);
		activities['today'] = results.filter((a) => {
			if (
				a.items.length > 0 &&
				a.items[0].start.getDate() === cDate &&
				a.items[0].start.getMonth() === cMonth &&
				a.items[0].start.getFullYear() === cYear
			) {
				return true;
			} else return null;
		});

		activities['month'] = results.filter((a) => {
			if (
				a.items.length > 0 &&
				a.items[0].start.getMonth() === cMonth &&
				a.items[0].start.getFullYear() === cYear
			) {
				return true;
			} else return null;
		});

		activities['year'] = results.filter((a) => {
			if (a.items.length > 0 && a.items[0].start.getFullYear() === cYear) {
				return true;
			} else return null;
		});

		activities['all'] = results.filter((a) => {
			if (a.items.length > 0) {
				return true;
			} else return null;
		});

		return activities;
	};

	$: activities = resolvePromise(data.activities.result);

	let createActivityDialog = undefined;
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
				<CreateActivityDialog />
				<Button
					class="rounded-full"
					variant="ghost"
					on:click={() => {
						createActivityDialog.open = true;
					}}
				>
					<Plus />
				</Button>
				<dialog bind:this={createActivityDialog}>
					<p>Greetings, one and all!</p>
					<form method="dialog">
						<button>OK</button>
					</form>
				</dialog>
			</div>
		</div>
		<!-- <Carousel class="w-full h-64" auto={false} horizontal={true}>
			{#each tabs as tab, i}
				<Card class="w-full">
					<CardHeader class="flex">
						<CardTitle class="text-lg font-medium">{tab.name}</CardTitle>
					</CardHeader>
					<CardContent>
						<Bar />
					</CardContent>
				</Card>
			{/each}
		</Carousel> -->

		<!-- <Carousel class="w-full h-64" auto={false} horizontal={true}>
			{#await activities}
				<Loader2 class="mr-2 h-4 w-4 animate-spin" />
			{:then activities}
				{#each tabs as tab, i}
					<Card class="w-full h-64">
						<CardHeader class="flex">
							<CardTitle class="text-lg font-medium">{tab.name}</CardTitle>
						</CardHeader>
						<CardContent>
							<Bar />
						</CardContent>
					</Card>
				{/each}
			{:catch error}
				<p>{error} ...</p>
			{/await}
		</Carousel> -->

		<!-- <Card class="w-full h-64">
			<CardHeader class="flex">
				<CardTitle class="text-lg font-medium">eee</CardTitle>
			</CardHeader>
			<CardContent>
				hello
				{#await activities then a}
					{a['all']}

					{#if activities[tab.key]}
						{tab.name}
						<Bar />
					{/if}
				{/await}
			</CardContent>
		</Card> -->

		{#await activities then a}
			<Carousel class="w-full h-64" auto={false} horizontal={true}>
				{#each tabs as tab, i}
					<Card class="w-full h-64">
						<CardHeader class="flex">
							<CardTitle class="text-lg font-medium">{tab.name}</CardTitle>
						</CardHeader>
						<CardContent>
							{#if a[tab.key]}
								<Bar />
							{/if}
						</CardContent>
					</Card>
				{/each}
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
									<TableRow key={activity.id}>
										<TableCell class="flex justify-start text-left">
											{#if activity.items.length > 0}
												{#if activity.items[0].start && !activity.items[0].end}
													<Form
														action="?/updateActivityItem"
														data={{ id: activity.items[0].id, end: new Date() }}
													>
														<StopCircle />
													</Form>
												{:else if !activity.items[0].start && !activity.items[0].end}
													<Form
														action="?/updateActivityItem"
														data={{ id: activity.items[0].id, start: new Date() }}
													>
														<Play />
													</Form>
												{:else}
													<Button class="rounded-full" variant="secondary" disabled>
														<Check />
													</Button>
													<Form
														action="?/createActivityItem"
														data={{ activityId: activity.id, start: new Date() }}
													>
														<Plus />
													</Form>
												{/if}
											{:else}
												<Form
													action="?/createActivityItem"
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
