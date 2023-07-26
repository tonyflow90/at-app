<script>
	import { quantize, interpolatePlasma, pie, arc } from 'd3';
	// import data from './pie-data' // or pass data to component as prop

	export let data = [];

	let width = 0; // outer width of the chart, in pixels
	let height = 0; // outer height of the chart, in pixels
	const percent = false; // format values as percentages (true/false)
	const fontSize = 10; // font size of the x and y values
	const strokeWidth = 1; // width of stroke separating wedges
	const strokeLinejoin = 'round'; // line join style of stroke separating wedges
	$: outerRadius = Math.min(width, height) * 0.5; // outer radius of the circle, in pixels
	const innerRadius = 0; // inner radius of the chart, in pixels
	$: labelRadius = innerRadius * 0.2 + outerRadius * 0.3; // center radius of labels
	const strokeColorWOR = 'white'; // stroke color when inner radius is greater than 0
	const strokeColorWIR = 'none'; // stroke color when inner radius is 0
	$: stroke = innerRadius > 0 ? strokeColorWIR : strokeColorWOR; // stroke separating widths
	$: padAngle = stroke === 'none' ? 1 / outerRadius : 0; // angular separation between wedges

	const x = data.length > 0 ? Object.keys(data[0])[0] : undefined;
	const y = data.length > 0 ? Object.keys(data[0])[1] : undefined;

	let xVals = data.map((el) => el[x]);
	let yVals = data.map((el) => Number(el[y]));
	if (percent) {
		const total = yVals.reduce((a, b) => a + b, 0);
		yVals = yVals.map((el) => el / total);
	}
	let iVals = data.map((el, i) => i);

	// colors can be adjusted manually by creating a color array which length matches length of data set.
	let colors;
	if (!colors) colors = quantize((t) => interpolatePlasma(t * 0.7 + 0.3), xVals.length);

	$: wedges = pie()
		.padAngle(padAngle)
		.sort(null)
		.value((i) => yVals[i])(iVals);

	$: arcPath = arc().innerRadius(innerRadius).outerRadius(outerRadius);

	$: arcLabel = arc().innerRadius(labelRadius).outerRadius(labelRadius);

	import { cn } from '$lib/utils';

	let className = undefined;
	export { className as class };
</script>

<div
	class={cn('w-64 h-64', className)}
	{...$$restProps}
	bind:clientWidth={width}
	bind:clientHeight={height}
>
	<svg
		{width}
		{height}
		viewBox="{-width / 2} {-height / 2} {width} {height}"
		transform="scale(1.1)"
	>
		{#each wedges as wedge, i}
			<path
				fill={colors[i]}
				d={arcPath(wedge)}
				{stroke}
				stroke-width={strokeWidth}
				stroke-linejoin={strokeLinejoin}
			/>
			<g text-anchor="middle" transform="translate({arcLabel.centroid(wedge)})">
				<text font-size={fontSize}>
					<tspan font-weight="bold">{xVals[i]}</tspan>
					<tspan x="0" dy="1.5em"
						>{percent ? `${(yVals[i] * 100).toFixed(2)}%` : yVals[i].toLocaleString('en-US')}</tspan
					>
				</text>
			</g>
		{/each}
	</svg>
</div>

<style>
</style>
