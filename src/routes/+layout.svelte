<script lang="ts">
	import '../app.postcss';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	import { Toaster } from 'svelte-french-toast';

	export let data;

	let { supabase, session } = data
	$: ({ supabase, session } = data)

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => data.subscription.unsubscribe()
	})

	import Header from '$components/custom/header/Header.svelte';

	import { pwaInfo } from 'virtual:pwa-info';

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';

	import { browser } from '$app/environment';

	import StartActivity from '$components/StartActivity.svelte';

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

<Header {data} />
<main class="flex justify-center">
	<div class="flex w-full max-w-2xl">
		<StartActivity />
		<slot />
	</div>
</main>
