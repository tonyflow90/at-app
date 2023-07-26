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

	import RollingText from '$components/custom/rollingtext/RollingText.svelte';
	import Carousel from '$components/custom/carousel/Carousel.svelte';
	import Separator from '$components/ui/separator/Separator.svelte';

	import { slide } from 'svelte/transition';
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
				<!-- <CreateActivity /> -->
			</CardContent>
		</Card>

		<Separator />

		<p class="text-4xl font-bold animate-pulse">Log what you did today!</p>

		<Carousel
			items={['Log ', 'what', 'you,', 'did', ' today!']}
			dots={3}
			auto={true}
			horizontal={false}
		>
			<div slot="item" let:item in:slide={{ axis: 'y' }}>
				<Card class="w-64">
					<CardHeader class="flex">
						<CardTitle class="text-lg font-medium">{item}</CardTitle>
					</CardHeader>
					<CardContent>
						<!-- {#if tabs[item.key]} -->
						<!-- <Bar data={a[item.key]} /> -->
						<!-- {/if} -->
					</CardContent>
				</Card>
			</div>
		</Carousel>
	</div>
</div>
