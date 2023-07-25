<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fly, slide, blur } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	import { cn } from '$lib/utils';

	let className: string | undefined | null = undefined;
	export { className as class };

	export let text: String | String[] = ['Hello', 'Bonjour', 'Konnichiwa'];
	export let tick: number = 2000;

	let index: number = 0;
	let interval: any;

	onMount(() => {
		interval = setInterval(() => {
			if (typeof text === 'string') text = text.split(' ');
			if (index === text.length - 1) index = 0;
			else index++;
		}, tick);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class={cn('flex h-24 items-center text-4xl overflow-hidden', className)} {...$$restProps}>
	{#each text as t, i}
		{#if i === index}
			<p
				class="absolute w-max"
				in:fly={{ delay: 0, duration: 300, x: 0, y: '100%', opacity: 0.1, easing: quintOut }}
				out:fly={{ delay: 0, duration: 300, x: 0, y: '-100%', opacity: 0.1, easing: quintOut }}
			>
				{t}
			</p>
		{/if}
	{/each}
</div>
