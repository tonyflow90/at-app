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

	export let caption = '';
	export let headerItems = [];
	export let items = [];
</script>

<Table class={cn('w-full', className)} {...$$restProps}>
	<TableCaption>{caption}</TableCaption>
	<TableHeader>
		<slot name="header" />

		<!-- {#if !$$slots.headerItem}
			<TableRow>
				<p>no header items</p>
			</TableRow>
		{:else}
			<TableRow class="flex">
				{#each headerItems as headerItem, i}
					<slot name="headerItem" {headerItem} />
				{/each}
			</TableRow>
		{/if} -->
	</TableHeader>
	<TableBody>
		{#if !$$slots.item}
			<TableRow>
				<p>no items</p>
			</TableRow>
		{:else}
			{#each items as item, i}
				<slot name="item" {item} />
			{/each}
		{/if}
	</TableBody>
</Table>
