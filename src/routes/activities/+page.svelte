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

	import { blur } from 'svelte/transition';

	import Donut from '$components/custom/charts/Donut.svelte';

	$: activities = data.activities;
	$: activitiesWithItems = data.activitiesWithItems;
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="description" content="Dashboard" />
</svelte:head>

<div class="flex flex-col w-full">
	<div class="flex-1 space-y-4 p-4 pt-6">
		<div class="flex items-center justify-between space-y-2">
			<h2 class="text-xl md:text-3xl font-bold tracking-tight">Activity Dashboard</h2>
			<div class="flex items-center space-x-2">
				<!-- <CreateDialog /> -->
			</div>
		</div>

		{#await activitiesWithItems then items}
			<!-- {#each items as item, i}
				Activities: {items.length} <br />
				{#each item.items as r, i}
					Items:{item.items.length}
				{/each}
			{/each} -->
			<Carousel {items} auto={false} horizontal={true}>
				<div slot="item" let:item in:blur>
					<Card class="w-96">
						<CardHeader class="flex">
							<CardTitle class="text-lg font-medium">{item.title}</CardTitle>
						</CardHeader>
						<CardContent class="flex items-center justify-center w-full h-auto">
							{#await item.items then items}
								{#if items.length > 0}
									<Donut
										class="w-96 h-96"
										data={items.map((i) => {
											return { id: i.id, time: i.end - i.start };
										})}
									/>
								{/if}
							{/await}
						</CardContent>
					</Card>
				</div>
			</Carousel>
		{/await}

		<!-- {#await data.activities then items}
			<ActivityTable {items} headerItems={Object.keys(items[0])}>
				<div slot="header">
					<TableRow>
						<TableHead>Status</TableHead>
						<TableHead>Title</TableHead>
						<TableHead>Time</TableHead>
					</TableRow>
				</div>
				<div slot="headerItem" let:headerItem>
					<ActivityTableHeaderItem {headerItem} />
				</div>
				<div slot="item" let:item>
					<ActivityTableRowItem {item} />
				</div>
			</ActivityTable>
		{/await} -->

		<!-- {#await activities then items}
			<Carousel items={tabs} auto={false} horizontal={true}>
				<div slot="item" let:item in:blur>
					<Card class="w-96">
						<CardHeader class="flex">
							<CardTitle class="text-lg font-medium">{item.name}</CardTitle>
						</CardHeader>
						<CardContent class="flex items-center justify-center w-full h-auto">
							<Donut class="w-96 h-96" data={makeArray(items[item.key])} />
						</CardContent>
					</Card>
				</div>
			</Carousel>
		{/await} -->

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
			{:then items}
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
								{#each items as item, i}
									<TableRow key={item.id} href="/">
										<TableCell class="flex justify-start text-left">
											{#if item.running}
												<Form
													action="?/updateActivityItem"
													data={{ id: item.current_item_id, end: new Date() }}
												>
													<StopCircle />
												</Form>
											{:else}
												<Form
													action="?/createActivityItem"
													data={{ activityId: item.id, start: new Date() }}
												>
													<Plus />
												</Form>
											{/if}
										</TableCell>
										<TableCell class="font-medium">{item.title}</TableCell>
										<TableCell>
											{#if item.running}
												<Timer bind:startAt={item.latest_start} />
											{:else}
												<Timer time={item.time} />
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
