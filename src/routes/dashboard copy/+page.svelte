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

	import { Check, Loader2, Pause, Play, StopCircle } from 'lucide-svelte';
	import { Watch } from 'lucide-svelte';
	import { Timer } from 'lucide-svelte';

	import { Button } from '$components/ui/button';
	import Bar from '$lib/charts/Bar.svelte';
	import type { ActionData, PageData, SubmitFunction } from './$types';
	import { page } from '$app/stores';
	import { applyAction, enhance } from '$app/forms';
	import { Checkbox } from '$components/ui/checkbox';

	const yTicks = [0, 1000, 2000, 3000, 4000, 5000];
	const chartData = [
		{
			name: 'Jan',
			value: Math.floor(Math.random() * 5000) + 1000
		},
		{
			name: 'Feb',
			value: Math.floor(Math.random() * 5000) + 1000
		},
		{
			name: 'Mar',
			value: Math.floor(Math.random() * 5000) + 1000
		},
		{
			name: 'Apr',
			value: Math.floor(Math.random() * 5000) + 1000
		},
		{
			name: 'May',
			value: Math.floor(Math.random() * 5000) + 1000
		},
		{
			name: 'Jun',
			value: Math.floor(Math.random() * 5000) + 1000
		},
		{
			name: 'Jul',
			value: Math.floor(Math.random() * 5000) + 1000
		},
		{
			name: 'Aug',
			value: Math.floor(Math.random() * 5000) + 1000
		},
		{
			name: 'Sep',
			value: Math.floor(Math.random() * 5000) + 1000
		},
		{
			name: 'Oct',
			value: Math.floor(Math.random() * 5000) + 1000
		},
		{
			name: 'Nov',
			value: Math.floor(Math.random() * 5000) + 1000
		},
		{
			name: 'Dec',
			value: Math.floor(Math.random() * 5000) + 1000
		}
	];

	export let data: PageData;
	import CreateActivityDialog from '$components/custom/activity/CreateDialog.svelte';
	import UpdateActivity from '$components/custom/activity/Update.svelte';

	let selectedTab = 'today';

	const formatToTime = (start: Date = new Date(), end: Date = new Date()) => {
		if (!start) start = new Date();
		if (!end) end = new Date();
		const time = Math.floor((end.getTime() - start.getTime()) / 1000);
		const second = time > 60 ? time % 60 : 0;
		const timeInMinutes = Math.floor(time / 60);
		const minute = timeInMinutes > 60 ? timeInMinutes % 60 : timeInMinutes;
		const timeInHours = Math.floor(time / (60 * 60));
		const hour = timeInHours > 60 ? timeInHours % 60 : timeInHours;
		return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second
			.toString()
			.padStart(2, '0')}`;
	};

</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="description" content="Dashboard" />
</svelte:head>

<div class="flex flex-col md:flex">
	<div class="flex-1 space-y-4 p-8 pt-6">
		<div class="flex items-center justify-between space-y-2">
			<h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
			<div class="flex items-center space-x-2">
				<CreateActivityDialog />
			</div>
		</div>

		<Tabs bind:value={selectedTab} class="space-y-4">
			<TabsList>
				<TabsTrigger value="today">
					<p on:click={(selectedTab = 'today')}>Today</p>
				</TabsTrigger>
				<TabsTrigger value="week">
					<p on:click={(selectedTab = 'week')}>Week</p>
				</TabsTrigger>
			</TabsList>
			<TabsContent value="today" class="space-y-4">
				<Card>
					<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle class="text-lg font-medium">A list of your recent activities.</CardTitle>
						<Watch class="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						{#await data.activities.result}
							<Loader2 class="mr-2 h-4 w-4 animate-spin" />

							<p>loading ...</p>
						{:then items}
							<Table>
								<TableCaption>A list of your recent activities.</TableCaption>
								<TableHeader>
									<TableRow>
										<TableHead class="w-full">Title</TableHead>
										<TableHead>Time</TableHead>
										<TableHead>Status</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{#each items as item, i}
										<TableRow key={item.id}>
											<TableCell class="font-medium">{item.title}</TableCell>
											<TableCell
												>{formatToTime(
													new Date(item.started_at) - new Date(item.finished_at)
												)}</TableCell
											>
											<TableCell class="text-right">
												{#if item.finished_at}
													<Check />
													<!-- <UpdateActivity data={{ id: item.id, finished_at: new Date() }}>
														<StopCircle />
													</UpdateActivity> -->
												{:else if item.started_at && !item.finished_at}
													<UpdateActivity data={{ id: item.id, finished_at: new Date() }}>
														<StopCircle />
													</UpdateActivity>
												{:else}
													<UpdateActivity data={{ id: item.id, finished_at: new Date() }}>
														<Play />
													</UpdateActivity>
												{/if}
											</TableCell>
										</TableRow>
									{/each}
								</TableBody>
							</Table>
						{:catch error}
							<p>{error} ...</p>
						{/await}
					</CardContent>
				</Card>
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Card>
						<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle class="text-sm font-medium">Total Revenue</CardTitle>
							<!-- <DollarSign class="h-4 w-4 text-muted-foreground" /> -->
						</CardHeader>
						<CardContent>
							<div class="text-2xl font-bold">$45,231.89</div>
							<p class="text-xs text-muted-foreground">+20.1% from last month</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle class="text-sm font-medium">Subscriptions</CardTitle>
							<!-- <Users class="h-4 w-4 text-muted-foreground" /> -->
						</CardHeader>
						<CardContent>
							<div class="text-2xl font-bold">+2350</div>
							<p class="text-xs text-muted-foreground">+180.1% from last month</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle class="text-sm font-medium">Sales</CardTitle>
							<!-- <CreditCard class="h-4 w-4 text-muted-foreground" /> -->
						</CardHeader>
						<CardContent>
							<div class="text-2xl font-bold">+12,234</div>
							<p class="text-xs text-muted-foreground">+19% from last month</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle class="text-sm font-medium">Active Now</CardTitle>
							<!-- <Activity class="h-4 w-4 text-muted-foreground" /> -->
						</CardHeader>
						<CardContent>
							<div class="text-2xl font-bold">+573</div>
							<p class="text-xs text-muted-foreground">+201 since last hour</p>
						</CardContent>
					</Card>
				</div>
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
					<Card class="col-span-3">
						<CardHeader>
							<CardTitle>Overview</CardTitle>
						</CardHeader>
						<CardContent>
							<Bar {yTicks} data={chartData} />
							<!-- <Overview /> -->
						</CardContent>
					</Card>
					<Card class="col-span-4">
						<CardHeader>
							<CardTitle>Overview</CardTitle>
						</CardHeader>
						<CardContent>
							<Bar {yTicks} data={chartData} />
							<!-- <Overview /> -->
						</CardContent>
					</Card>
					<Card class="col-span-4">
						<CardHeader>
							<CardTitle>Recent Sales</CardTitle>
							<CardDescription>You made 265 sales this month.</CardDescription>
						</CardHeader>
						<CardContent>
							<!-- <RecentSales /> -->
						</CardContent>
					</Card>
				</div>
			</TabsContent>
		</Tabs>
	</div>
</div>
