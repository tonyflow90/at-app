<script lang="ts">
	import { scaleLinear } from 'd3-scale';

	let width = 100;
	let height = 100;

	function formatMobile(tick: number | string) {
		return "'" + tick.toString().slice(-2);
	}

	$: xScale = scaleLinear()
		.domain([0, xTicks.length])
		.range([padding.left, width - padding.right]);

	$: yScale = scaleLinear()
		.domain([0, Math.max.apply(null, yTicks)])
		.range([height - padding.bottom, padding.top]);

	$: innerWidth = width - (padding.left + padding.right);
	$: barWidth = innerWidth / xTicks.length;

	const padding = { top: 20, right: 15, bottom: 20, left: 45 };

	type BarChartItem = {
		name: string;
		value: number;
	};

	export let data: Array<BarChartItem> = [];
	export let yTicks: Array<any> = [0, 50, 100];
	export let xTicks: Array<any> = Array.from(Array(data.length));
</script>

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
	<svg class="w-full">
		<g class="axis y-axis">
			{#each yTicks as tick}
				<g class="text-xs" transform="translate(0, {yScale(tick)})">
					<text
						stroke="none"
						font-size="12"
						orientation="left"
						width="60"
						height="310"
						x="57"
						y="-4"
						fill="#888888"
						text-anchor="end"><tspan x="36" dy="0.355em">{tick}</tspan></text
					>
				</g>
			{/each}
		</g>

		<g class="axis x-axis">
			{#each data as point, i}
				<g class="text-xs" transform="translate({xScale(i)},{height})">
					<text
						stroke="none"
						font-size="12"
						orientation="bottom"
						width="531"
						height="30"
						x={barWidth / 2}
						y="-15"
						fill="#888888"
						text-anchor="middle"
						><tspan x={barWidth / 2} dy="0.71em"
							>{width > 380 ? point.name : formatMobile(point.name)}</tspan
						></text
					>
				</g>
			{/each}
		</g>

		<g>
			{#each data as point, i}
				<rect
					x={xScale(i) + 2}
					y={yScale(point.value)}
					width={barWidth - 8}
					height={yScale(0) - yScale(point.value)}
					fill="#adfa1d"
					rx="4"
					ry="4"
				/>
			{/each}
		</g>
	</svg>
</div>
