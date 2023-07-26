<script>
	import * as d3 from 'd3';

	export let data;
	export let width = 640;
	export let height = 400;
	export let marginTop = 20;
	export let marginRight = 20;
	export let marginBottom = 30;
	export let marginLeft = 40;

	let gx;
	let gy;

	const xl = Object.keys(data[0])[0]; // given d in data, returns the (ordinal) x-value
	const yl = Object.keys(data[0])[1]; // given d in data, returns the (quantitative) y-value

	$: reactiveXVals = data.map((el) => el[xl]);
	$: reactiveYVals = data.map((el) => el[yl]);

	// $: x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
	// $: y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);

	$: xScale = d3.scaleLinear()
		.domain([0, reactiveXVals.length])
		.range([0, 600]);

	$: yScale = d3.scaleLinear()
		.domain([0, Math.max.apply(null, reactiveYVals)])
		.range([600, 10]);

	$: line = d3.line((d, i) => xScale(i), yScale);
	$: d3.select(gx).call(d3.axisLeft(yScale));
	$: d3.select(gy).call(d3.axisBottom(xScale));
</script>

<svg {width} {height}>
	<g bind:this={gx} transform="translate(0,{height - marginBottom})" />
	<g bind:this={gy} transform="translate({marginLeft},0)" />
	<path fill="none" stroke="currentColor" stroke-width="1.5" d={line(data)} />
	<g fill="white" stroke="currentColor" stroke-width="1.5">
		{#each data as d, i}
			<!-- <circle key={i} cx={x(i)} cy={y(d)} r="2.5" fill="red" />
			 -->
			 <rect
			 x={xScale(i) + 2}
			 y={yScale(d.value)}
			 width={20 - 8}
			 height={yScale(0) - yScale(d.value)}
			 fill="#adfa1d"
			 rx="40"
			 ry="40"
		 />
		{/each}
	</g>
</svg>
