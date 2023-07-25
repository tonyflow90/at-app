<script lang="ts">
	import '../app.postcss';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	import type { LayoutData } from './$types';

	import { Toaster } from 'svelte-french-toast';

	export let data: LayoutData;

	$: ({ supabase } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => subscription.unsubscribe();
	});

	import Header from '$components/custom/header/Header.svelte';

	import { pwaInfo } from 'virtual:pwa-info';

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';

	import { browser } from '$app/environment';
	import RollingText from '$components/custom/rollingtext/RollingText.svelte';
	import { Card, CardContent, CardHeader, CardTitle } from '$components/ui/card';

	let head = undefined,
		body = undefined,
		css = undefined,
		meta = undefined;

	$: if (browser) {
		head = document.querySelector('head');
		body = document.querySelector('body');
		css = getComputedStyle(body);
		meta = head?.getElementsByTagName('meta')['theme-color'];
		if (meta) meta.content = css.backgroundColor;
	}
</script>

<svelte:head>
	<!-- Chrome, Firefox OS and Opera -->
	<meta name="theme-color" content="" />

	<meta name="apple-mobile-web-app-capable" content="yes" />

	<meta name="apple-mobile-web-app-status-bar-style" content="default" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

	{@html webManifestLink}
</svelte:head>

<Toaster />

<div>
	<Header {data} />

	<!-- <Card>
		<CardContent class="justify-items-center items-center w-full overflow-hidden p-8 h-64 text-4xl font-bold">
			<RollingText
				class="justify-items-center items-center w-full text-4xl font-bold"
				text={['What', 'did you', 'eat', 'today?']}
				tick="1500"
			/>
		</CardContent>
	</Card> -->

	<main>
		<slot />
	</main>
</div>
