<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fly, scale, slide, blur } from 'svelte/transition';
	import { backIn, cubicInOut, linear, quintOut } from 'svelte/easing';

	import { cn } from '$lib/utils';

	import {
		ArrowBigLeft,
		ChevronDown,
		ChevronLeft,
		ChevronRight,
		ChevronUp,
		ChevronUpSquare,
		Dot,
		MoveLeft
	} from 'lucide-svelte';
	import Button from '$components/ui/button/Button.svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	let items: Object | Object[] = [];
	export let auto: Boolean = false;
	export let tick: number = 5000;
	export let duration: number = 250;
	export let horizontal = true;
	let forward = true;

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
			forward = true;
			if (index === items.length - 1) index = 0;
			else index++;
		}, tick);
	};

	let el = undefined;
	$: if (el) {
		if (el.children.length > 0) {
			items = Object.values(el.children);
		}
	}

	const next = () => {
		forward = true;
		clearInterval(interval);
		if (auto) {
			interval = run();
		}
		if (index === items.length - 1) index = 0;
		else index++;
	};

	const back = () => {
		forward = false;
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

	const touchend = (event) => {
		let touch = event.changedTouches[0];
		let xcoord = touch.pageX || touch.clientX;
		let diff = touchxcoord - (touchxcoord - xcoord);
		// if (diff > -100) next();
		// else back();
	};
</script>

<div class="hidden" bind:this={el}>
	<slot />
</div>

<div class="gird grid-rows-1">
	<div class="flex flex-row">
		<div
			class={cn('relative overflow-hidden', className)}
			{...$$restProps}
			on:touchstart={touchstart}
			on:touchend={touchend}
		>
			{#each items as item, i}
				{#if i === index}
					<div
						class={cn('absolute', className)}
						in:scale={{
							duration: duration,
							delay: duration * 2,
							start: 0.8,
							opacity: 1,
							easing: linear
						}}
						out:scale={{ duration: duration, delay: 0, start: 0.8, opacity: 1, easing: linear }}
					>
						<div
							in:fly={{
								delay: duration,
								duration: duration,
								x: horizontal ? (forward ? 1 * 120 + '%' : -1 * 120 + '%') : 0,
								y: !horizontal ? (forward ? 1 * 120 + '%' : -1 * 120 + '%') : 0,
								opacity: 1,
								easing: linear
							}}
							out:fly={{
								delay: duration,
								duration: duration,
								x: horizontal ? (!forward ? 1 * 120 + '%' : -1 * 120 + '%') : 0,
								y: !horizontal ? (!forward ? 1 * 120 + '%' : -1 * 120 + '%') : 0,
								opacity: 1,
								easing: linear
							}}
						>
							{@html item.outerHTML}
						</div>
					</div>
				{/if}
			{/each}
		</div>

		{#if !horizontal}
			<div class="flex flex-col p-2 items-center justify-center">
				<Button variant="ghost" class="flex flex-auto" on:click={() => back()}>
					<ChevronUp />
				</Button>
				{#each items as item, i}
					<Button
						href="/"
						variant={index === i ? 'default' : 'secondary'}
						class="w-4 h-4 m-0 p-0 rounded-full"
						on:click={() => select(i)}
					/>
				{/each}
				<Button variant="ghost" class="flex flex-auto" on:click={() => next()}>
					<ChevronDown />
				</Button>
			</div>
		{/if}
	</div>

	{#if horizontal}
		<div class="flex flex-row p-2 items-center justify-center">
			<Button variant="ghost" class="flex flex-auto" on:click={() => back()}>
				<ChevronLeft />
			</Button>
			{#each items as item, i}
				<Button
					variant={index === i ? 'default' : 'secondary'}
					class="w-4 h-4 m-0 p-0 rounded-full"
					on:click={() => select(i)}
				/>
			{/each}
			<Button variant="ghost" class="flex flex-auto" on:click={() => next()}>
				<ChevronRight />
			</Button>
		</div>
	{/if}
</div>
