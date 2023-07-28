<script>
	import { cn } from '$lib/utils';
	import { pie, arc } from 'd3';

	let className = undefined;
	export { className as class };

	export let data = [];
	export let scale = 1.1;
	export let percent = true;
	export let showLabel = false;
	export let radius = 0;

	$: outerRadius = Math.min(width, height) * 0.5;
	$: innerRadius = (outerRadius / 100) * radius;
	$: labelRadius = innerRadius > 0 ? innerRadius * (1.9 - radius / 100) : outerRadius * 0.5;
	$: wedges = pie()
		.sort(null)
		.value((i) => yVals[i])(iVals);
	$: arcPath = arc().innerRadius(innerRadius).outerRadius(outerRadius);
	$: arcLabel = arc().innerRadius(labelRadius).outerRadius(labelRadius);

	const x = data.length > 0 ? Object.keys(data[0])[0] : undefined;
	const y = data.length > 0 ? Object.keys(data[0])[1] : undefined;

	let xVals = data.map((el) => el[x]);
	let yVals = data.map((el) => Number(el[y]));

	if (percent) {
		const total = yVals.reduce((a, b) => a + b, 0);
		yVals = yVals.map((el) => el / total);
	}
	let iVals = data.map((el, i) => i);

	let width = 0;
	let height = 0;
</script>

<div
	class={cn('w-32 h-32 fill-secondary', className)}
	{...$$restProps}
	bind:clientWidth={width}
	bind:clientHeight={height}
>
	<svg
		{width}
		{height}
		viewBox="{-width / 2} {-height / 2} {width} {height}"
		transform="scale({scale})"
	>
		{#each wedges as wedge, i}
			<path d={arcPath(wedge)} class="stroke-2 stroke-border" />
			<g text-anchor="middle" transform="translate({arcLabel.centroid(wedge)})">
				<text class="fill-accent-foreground font-bold text-xs">
					{#if showLabel}
						<tspan>{xVals[i]}</tspan>
					{/if}
					<tspan
						>{percent
							? `${(yVals[i] * 100).toFixed(2)}%`
							: yVals[i].toLocaleString(navigator.language || navigator.userLanguage)}</tspan
					>
				</text>
			</g>
		{/each}
	</svg>
</div>