<script lang="ts">
	import { enhance } from '$app/forms';
	import { Loader2 } from 'lucide-svelte';
	import { Input } from '$components/ui/input';
	import { Label } from '$components/ui/label';
	import { Button } from '$components/ui/button';

	import type { SubmitFunction } from './$types';

	import toast from 'svelte-french-toast';

	let isLoading: boolean = false;

	const submit: SubmitFunction = ({ formElement, formData, action, cancel, submitter }) => {
		let data = Object.fromEntries(formData);
		isLoading = true;
		return async ({ result, update }) => {
			isLoading = false;
			switch (result.type) {
				case 'success':
					toast.success(successMessage);
					break;
				case 'failure':
					toast.error(errorMessage);
					break;
				default:
					break;
			}
			await update();
		};
	};

	export let data: any = {};
	export let action = 'update';
	export let successMessage = 'updated';
	export let errorMessage = 'Error updating';
</script>

<form class="grid gap-2" method="POST" action="?/{action}" use:enhance={submit}>
	{#each Object.keys(data) as key}
		<Label hidden>
			<Input id={key} name={key} hidden value={data[key]} />
		</Label>
	{/each}

	<Button type="submit" variant="ghost" disabled={isLoading}>
		{#if isLoading}
			<Loader2 class="mr-2 h-4 w-4 animate-spin" />
		{/if}
		{#if $$slots.default}
			<slot />
		{:else}
			Update
		{/if}
	</Button>
</form>
