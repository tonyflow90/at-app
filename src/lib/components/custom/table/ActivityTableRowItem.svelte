<script>
	import { cn } from '$lib/utils';

	let className = undefined;
	export { className as class };

	import {
		Table,
		TableBody,
		TableCaption,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$components/ui/table';
	import { Plus, StopCircle } from 'lucide-svelte';
	import Form from '../form/Form.svelte';
	import Timer from '../timer/Timer.svelte';

	export let item = {};
</script>

{#if !item}
	<TableRow>
		<p>no item data</p>
	</TableRow>
{:else}
	<TableRow
		class={cn('w-full', className)}
		{...$$restProps}
		key={item.id}
		href="/"
	>
		<!-- <TableCell class="flex justify-start text-left">
			{#if item.items.length > 0}
				{#if item.items[0].start && !item.items[0].end}
					<Form action="?/stopitemItem" data={{ id: item.items[0].id, end: new Date() }}>
						<StopCircle />
					</Form>
				{:else}
					<Form action="?/startNewitemItem" data={{ itemId: item.id, start: new Date() }}>
						<Plus />
					</Form>
				{/if}
			{:else}
				<Form action="?/startNewitemItem" data={{ itemId: item.id, start: new Date() }}>
					<Plus />
				</Form>
			{/if}
		</TableCell> -->
		<TableCell class="font-medium">{item.title}</TableCell>
		<!-- <TableCell>
			{#if item.items.length > 0}
				{#each item.items as item}
					{#if item.start}
						<Timer startAt={item.start} endAt={item.end} />
					{:else}
						<Timer />
					{/if}
				{/each}
			{/if}
		</TableCell> -->
	</TableRow>
{/if}
