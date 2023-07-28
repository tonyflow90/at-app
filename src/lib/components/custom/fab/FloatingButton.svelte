<script>
	import { Button } from '$components/ui/button';
	import { cn } from '$lib/utils';

	let className = undefined;
	export { className as class };
</script>

<Button class={cn('fixed w-16 h-16 bottom-5 right-5 md:bottom-20 md:right-20 rounded-full', className)} {...$$restProps}>
	{#if $$slots.default}
		<slot />
	{/if}
</Button>
