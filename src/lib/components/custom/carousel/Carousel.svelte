<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import { cn } from '$lib/utils';

	import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-svelte';
	import Button from '$components/ui/button/Button.svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	export let auto: Boolean = false;
	export let tick: number = 5000;
	export let dots: number = 5;
	export let horizontal: Boolean = true;

	$: dotcount = Math.floor(dots / 2);

	let index: number = 0;
	let interval: any;

	onMount(() => {
		if (auto) {
			interval = run();
		}
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	const run = () => {
		return setInterval(() => {
			if (index === items.length - 1) index = 0;
			else index++;
		}, tick);
	};

	const next = () => {
		clearInterval(interval);
		if (auto) {
			interval = run();
		}
		if (index === items.length - 1) index = 0;
		else index++;
	};

	const back = () => {
		clearInterval(interval);
		if (auto) {
			interval = run();
		}
		if (index === 0) index = items.length - 1;
		else index--;
	};

	const select = (i) => {
		clearInterval(interval);
		if (auto) {
			interval = run();
		}
		if (!i) index = 0;
		else index = i;
	};

	let touchxcoord = 0;
	const touchstart = (event) => {
		let touch = event.touches[0];
		touchxcoord = touch.pageX || touch.clientX;
	};

	export let items = [];
</script>

{#if !$$slots.item}
	<p>no item set</p>
{/if}

<div class="gird grid-rows-1">
	<div class="flex flex-row items-center justify-center">
		<div
			class={cn('relative overflow-hidden', className)}
			{...$$restProps}
		>
			{#each items as item, i}
				{#if i === index}
					<slot class="absolute" name="item" {item} />
				{/if}
			{/each}
		</div>

		{#if !horizontal && items.length > 0}
			<div class="flex flex-col p-2 items-center justify-center">
				<Button variant="ghost" class="flex flex-auto" on:click={() => back()}>
					<ChevronUp />
				</Button>
				{#each items as item, i}
					{#if index - dotcount <= 0 && index + dotcount + (index - dotcount) * -1 >= i}
						<Button
							href="/"
							variant={index === i ? 'default' : 'secondary'}
							class="w-4 h-4 m-1 p-0 rounded-full"
							on:click={() => select(i)}>{i + 1}</Button
						>
					{:else if index + dotcount >= items.length && items.length - 2 - dotcount * 2 < i}
						<Button
							href="/"
							variant={index === i ? 'default' : 'secondary'}
							class="w-4 h-4 m-1 p-0 rounded-full"
							on:click={() => select(i)}>{i + 1}</Button
						>
					{:else if index - dotcount <= i && index + dotcount >= i}
						<Button
							href="/"
							variant={index === i ? 'default' : 'secondary'}
							class="w-4 h-4 m-1 p-0 rounded-full"
							on:click={() => select(i)}>{i + 1}</Button
						>
					{/if}
				{/each}
				<Button variant="ghost" class="flex flex-auto" on:click={() => next()}>
					<ChevronDown />
				</Button>
			</div>
		{/if}
	</div>

	{#if horizontal && items.length > 0}
		<div class="flex flex-row p-2 items-center justify-center">
			<Button variant="ghost" class="flex flex-auto" on:click={() => back()}>
				<ChevronLeft />
			</Button>
			{#each items as item, i}
				{#if index - dotcount <= 0 && index + dotcount + (index - dotcount) * -1 >= i}
					<Button
						href="/"
						variant={index === i ? 'default' : 'secondary'}
						class="w-4 h-4 m-1 p-0 rounded-full"
						on:click={() => select(i)}>{i + 1}</Button
					>
				{:else if index + dotcount >= items.length && items.length - 2 - dotcount * 2 < i}
					<Button
						href="/"
						variant={index === i ? 'default' : 'secondary'}
						class="w-4 h-4 m-1 p-0 rounded-full"
						on:click={() => select(i)}>{i + 1}</Button
					>
				{:else if index - dotcount <= i && index + dotcount >= i}
					<Button
						href="/"
						variant={index === i ? 'default' : 'secondary'}
						class="w-4 h-4 m-1 p-0 rounded-full"
						on:click={() => select(i)}>{i + 1}</Button
					>
				{/if}
			{/each}
			<Button variant="ghost" class="flex flex-auto" on:click={() => next()}>
				<ChevronRight />
			</Button>
		</div>
	{/if}
</div>
