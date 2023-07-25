<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$components/ui/card';

	import { Watch } from 'lucide-svelte';

	import CreateActivity from '$components/custom/activity/Create.svelte';
	import CreateActivityDialog from '$components/custom/activity/CreateDialog.svelte';
	import Test from '$components/custom/images/Test.svelte';
	import RollingText from '$components/custom/rollingtext/RollingText.svelte';
	import Carousel from '$components/custom/carousel/Carousel.svelte';
	import Separator from '$components/ui/separator/Separator.svelte';
</script>

<svelte:head>
	<title>Welcome</title>
	<meta name="description" content="Welcome" />
</svelte:head>

<div class="flex flex-col md:flex">
	<div class="flex-1 space-y-4 p-8 pt-6">
		<RollingText
			class="text-4xl font-bold text-center"
			text={['Log ', 'what you did', ' today!']}
		/>

		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-lg font-medium">Create new activity.</CardTitle>
				<Watch class="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<CreateActivity />
			</CardContent>
		</Card>

		<Separator />

		<p class="text-4xl font-bold animate-pulse">Log what you did today!</p>

		<Carousel class="w-full h-40" auto={true} tick={5000} horizontal={true}>
			{#each ['Log ', 'what', 'you,', 'did', ' today!'] as el, i}
				<Card class="w-full h-40">
					<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle class="text-lg font-medium">{el}</CardTitle>
					</CardHeader>
				</Card>
			{/each}
		</Carousel>
	</div>
</div>
