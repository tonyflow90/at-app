<script lang="ts">
	import { cn } from '$lib/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div
	class={cn('flex bg-card text-card-foreground w-32 h-32', className)}
	{...$$restProps}
>
	<svg class={cn('h-fit fill-muted-foreground opacity-30 relative animate-rotate', className)} viewBox="-1.25 -1.25 2.5 2.5" preserveAspectRatio="xMidYMid slice">
		<path
			class="motion"
			d="M0.073 -1.029C0.377 -1.029 0.565 -1.098 0.755 -0.86C0.945 -0.622 0.917 -0.01 0.849 0.286C0.782 0.583 0.85 0.687 0.576 0.819C0.302 0.951 -0.198 1.009 -0.472 0.877C-0.746 0.745 -0.98 0.513 -1.048 0.216C-1.116 -0.08 -0.964 -0.395 -0.774 -0.633C-0.584 -0.871 -0.232 -1.029 0.073 -1.029"
		/>
		<path
			class="rotating"
			d="M-0.201 -1.109C0.104 -1.109 0.641 -0.684 0.831 -0.446C1.02 -0.208 1.041 0.034 0.973 0.331C0.905 0.628 0.734 0.794 0.46 0.926C0.186 1.058 -0.135 0.809 -0.409 0.677C-0.684 0.545 -0.935 0.404 -1.002 0.108C-1.07 -0.189 -0.883 -0.402 -0.693 -0.64C-0.503 -0.878 -0.505 -1.109 -0.201 -1.109"
		/>
		<path
			class="rotating"
			d="M-0.071 -1.168C0.233 -1.168 0.732 -0.956 0.922 -0.718C1.112 -0.48 1.173 0.027 1.105 0.324C1.038 0.621 0.707 0.81 0.433 0.943C0.159 1.075 -0.096 1.135 -0.37 1.003C-0.644 0.871 -0.86 0.457 -0.927 0.161C-0.995 -0.136 -0.87 -0.516 -0.68 -0.754C-0.49 -0.992 -0.376 -1.168 -0.071 -1.168"
		/>
		<path
			class="rotating"
			d="M-0.004 -0.998C0.3 -0.998 0.535 -0.852 0.725 -0.614C0.915 -0.376 1.05 -0.09 0.982 0.207C0.915 0.504 0.659 0.807 0.385 0.939C0.111 1.071 -0.178 1.048 -0.452 0.916C-0.727 0.784 -0.942 0.582 -1.009 0.285C-1.077 -0.011 -1.141 -0.335 -0.951 -0.573C-0.761 -0.811 -0.309 -0.998 -0.004 -0.998"
		/>
	</svg>
	<slot />
</div>

<style>
	.animate-rotate path {
		animation: 20s linear infinite rotate-right;
	}

	.animate-rotate path:nth-child(2) {
		animation-name: rotate-left;
		animation-duration: 25s;
	}
	.animate-rotate path:nth-child(3) {
		animation-name: rotate-right;
		animation-duration: 22.5s;
	}
	.animate-rotate path:nth-child(4) {
		animation-name: rotate-left;
		animation-duration: 27.5s;
	}
	.animate-rotate path:nth-child(5) {
		animation-name: rotate-right;
		animation-duration: 30s;
	}

	@keyframes rotate-right {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes rotate-left {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(-360deg);
		}
	}

	.abs-fill {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		contain: strict;
	}

	.animate-rotate path {
		opacity: 0.3;
	}
</style>
