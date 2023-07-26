<script lang="ts">
	import { enhance } from '$app/forms';
	import { Loader2 } from 'lucide-svelte';
	import { Input } from '$components/ui/input';
	import { Label } from '$components/ui/label';
	import { Button } from '$components/ui/button';

	import type { SubmitFunction } from './$types';

	import toast from 'svelte-french-toast';

	let isLoading: boolean = false;
	let msg: string = '';

	const submit: SubmitFunction = ({ formElement, formData, action, cancel, submitter }) => {
		let data = Object.fromEntries(formData);
		isLoading = true;
		return async ({ result, update }) => {
			isLoading = false;
			switch (result.type) {
				case 'success':
					msg = result?.data?.message ? result.data.message : successMessage;
					toast.success(msg);
					break;
				case 'error':
					msg = result?.error?.message ? result.error.message : errorMessage;
					toast.error(msg);
					break;
				case 'failure':
					msg = result?.data?.message ? result.data.message : errorMessage;
					toast.error(msg);
					break;
				default:
					break;
			}
			await update({ reset: result.type === 'failure' ? false : true });
		};
	};

	export let data: any = {};
	export let action = 'action';
	export let successMessage = 'action';
	export let errorMessage = 'Error action';
</script>

<form class="grid gap-2" method="POST" {action} use:enhance={submit}>
	{#each Object.keys(data) as key}
		<Label hidden>
			<Input id={key} name={key} hidden value={data[key]} />
		</Label>
	{/each}

	<Button type="submit" variant="ghost" disabled={isLoading}>
		{#if isLoading}
			<Loader2 class="mr-2 h-4 w-4 animate-spin" />
		{:else if $$slots.default}
			<slot />
		{:else}
			Action
		{/if}
	</Button>
</form>
