<script lang="ts">
	import { Button } from '$components/ui/button';
	import { Moon } from 'lucide-svelte';
	import { Sun } from 'lucide-svelte';

	const checkIfDarkModeIsActive = () => {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			return true;
		} else {
			return false;
		}
	};

	const setDarkMode = (isDark: boolean) => {
		if (isDark) {
			isDarkModeActive = isDark;
			localStorage.theme = 'dark';
			document.documentElement.classList.add('dark');
		} else {
			isDarkModeActive = isDark;
			localStorage.theme = 'light';
			document.documentElement.classList.remove('dark');
		}
		setActionbarColor();
	};

	const setActionbarColor = () => {
		let head = document.querySelector('head'),
			body = document.querySelector('body'),
			css = getComputedStyle(body),
			meta = head?.getElementsByTagName('meta')['theme-color'];
		meta.content = css.backgroundColor;
	};

	const toggle = () => {
		isDarkModeActive = checkIfDarkModeIsActive();
		setDarkMode(!isDarkModeActive);
	};

	let isDarkModeActive: boolean;
</script>

<svelte:head>
	<script>
		if (!('theme' in localStorage)) {
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		} else {
			let theme = localStorage.getItem('theme');
			if (theme) {
				document.documentElement.classList.add(theme);
			}
		}
	</script>
</svelte:head>

<Button class="rounded-full" variant="ghost" on:click={toggle}>
	{#if !isDarkModeActive}
		<Moon />
	{:else}
		<Sun />
	{/if}
</Button>
