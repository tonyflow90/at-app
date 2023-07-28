<script>
	// svelte
	import { base } from '$app/paths';

	// shacdn

	// lucide
	import { LogOut } from 'lucide-svelte';

	// self
	import Form from '$components/custom/form/Form.svelte';

	export let showText = false;
</script>

<Form variant="destructive" action="/{base}?/signout">
	<LogOut />
	{#if showText}
		<p class="pl-4">Sign out</p>
	{/if}
</Form>
