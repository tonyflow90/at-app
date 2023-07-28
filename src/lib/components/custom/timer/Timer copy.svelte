<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { tweened } from 'svelte/motion';

	export let startAt: Date = undefined;
	export let endAt: Date = undefined;
	export let running: boolean = false;
	export let tick = 1000;

	let interval = undefined;
	let timer = tweened(0);

	onMount(() => {
		interval = run();
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	const run = () => {
		return setInterval(() => {
			if (running) $timer = (new Date() - startAt) / 1000;
			else $timer = 0;
		}, tick);
	};

	$: if (startAt != undefined && !endAt) {
		running = true;
	}

	$: if (startAt && endAt) {
		running = false;
		$timer = (endAt - startAt) / 1000;
		clearInterval(interval);
	}

	$: seconds = Math.floor($timer > 60 ? $timer % 60 : $timer);
	$: minutes = Math.floor($timer > 60 ? ($timer / 60) % 60 : 0);
	$: hours = Math.floor($timer / 60 > 60 ? ($timer / 3600) % 60 : 0);
</script>

{#if $timer != 0}
	{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds
		.toString()
		.padStart(2, '0')}
{:else}
	<p>--:--:--</p>
{/if}
