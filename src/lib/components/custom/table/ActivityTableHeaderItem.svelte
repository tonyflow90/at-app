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

	export let headerItem = {};
</script>

{#if !headerItem}
	<TableCell>
		<p>no header item data</p>
	</TableCell>
{:else}
	<TableCell class={cn('w-full', className)} {...$$restProps}>
		{headerItem}
	</TableCell>
{/if}
