<script lang="ts">
	import { scaleLinear, scaleBand } from 'd3';
	// import data from './bar-data'; // or pass data to component as prop

	export let data = [];

	export let  xPadding = 1; // padding between bars
	export let  yFormat = '%'; // unit to display on y-axis ticks
	export let  yLabel = '↑ Cost'; // label for the y-axis
	export let  yScalefactor = 6; // number of ticks on y-yaxis

	const marginTop = 15; // top margin, in pixels
	const marginRight = -5; // right margin, in pixels
	const marginBottom = 20; // bottom margin, in pixels
	const marginLeft = 30; // left margin, in pixels

	// Compute values X and Y value of Arrays
	const x = Object.keys(data[0])[0]; // given d in data, returns the (ordinal) x-value
	const y = Object.keys(data[0])[1]; // given d in data, returns the (quantitative) y-value
	$: reactiveXVals = data.map((el) => el[x]);
	$: reactiveYVals = data.map((el) => el[y]);

	// Compute default domains, and unique the x-domain.
	$: reactiveXDomain = reactiveXVals; // an array of (ordinal) x-values // sort by descending frequency
	$: reactiveYDomain = [0, Math.max(...reactiveYVals)]; // [ymin, ymax]

	// Construct scales, axes, and formats.
	// const xRange = [marginLeft, width - marginRight]; // [left, right]
	// const yRange = [height - marginBottom, marginTop * 2]; // [bottom, top]

	$: reactiveXScale = scaleBand(reactiveXDomain).padding(xPadding);
	$: reactiveYScale = scaleLinear(reactiveYDomain).nice();

	$: reactiveYTicks = reactiveYScale.ticks(yScalefactor);
	$: reactiveYTicksFormatted = reactiveYTicks.map((el) => el.toLocaleString('en-US'));

	import { cn } from '$lib/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div bind:clientWidth={w} bind:clientHeight={h}>

</div>	
<svg class={cn('w-94', className)} {...$$restProps}>
	<!-- <svg {width} {height} viewBox="0 0 {width} {height}"> -->
	<g class="x-axis">
		<!-- <path class="domain" stroke="black" d="M{marginLeft}, 0.5 H{width}" /> -->
		{#each reactiveXVals as xVal, i}
			<g class="tick" opacity="1" transform="translate({reactiveXScale(xVal)},0)">
				<line
					x1={reactiveXScale.bandwidth() / 2}
					x2={reactiveXScale.bandwidth() / 2}
					stroke="black"
					y2="6"
				/>
				<text y={marginBottom} dx={reactiveXScale.bandwidth() / 4}>{xVal}</text>
			</g>
		{/each}
	</g>

	<g class="y-axis" transform="translate({marginLeft}, 0)">
		{#each reactiveYTicks as tick, i}
			<g class="tick" opacity="1" transform="translate(0, {reactiveYScale(tick)})">
				<line class="tick-start" stroke="black" stroke-opacity="1" x2="-6" />
				<!-- <line class="tick-grid" x2={width - marginLeft - marginRight} /> -->
				<text x={-marginLeft} y="10"
					>{yFormat === '%'
						? reactiveYTicksFormatted[i] * 100 + yFormat
						: reactiveYTicksFormatted[i] + yFormat}</text
				>
			</g>
		{/each}
		<text x="-{marginLeft}" y={marginTop}>{yLabel}</text>
	</g>

	<!-- <g class="bars">
			{#each reactiveYVals as bar, i (bar)}
				<rect
					x={reactiveXScale(reactiveXVals[i])}
					y={reactiveYScale(reactiveYVals[i])}
					width={reactiveXScale.bandwidth()}
					height={reactiveYScale(0) - reactiveYScale(bar)}
					fill={color}
					animate:flip={{ duration: 1000 }}
				/>
			{/each}
		</g> -->
</svg>
