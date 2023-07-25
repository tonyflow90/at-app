<script lang="ts">
	import { enhance } from '$app/forms';
	import { Loader2 } from 'lucide-svelte';
	import { Input } from '$components/ui/input';
	import { Label } from '$components/ui/label';
	import { Button } from '$components/ui/button';
	import { Checkbox } from '$components/ui/checkbox';

	import type { SubmitFunction } from './$types';

	import toast from 'svelte-french-toast';

	let isLoading: boolean = false;

	const submit: SubmitFunction = ({ formElement, formData, action, cancel, submitter }) => {
		let data = Object.fromEntries(formData);
		debugger
		isLoading = true;
		return async ({ result, update }) => {
			debugger
			isLoading = false;
			switch (result.type) {
				case 'success':
					toast.success(successMessage);
					break;
				case 'failure':
					debugger;
					toast.error(errorMessage);
					break;
				default:
					break;
			}
			await update();
		};
	};

	let name: string = '';
	export let action = 'addActivity';
	export let successMessage = 'Activity created';
	export let errorMessage = 'Error creating activity';
</script>

<form class="grid gap-2" method="POST" action="?/{action}" use:enhance={submit}>
	<Label>
		<Input
			bind:value={name}
			id="activity"
			name="title"
			placeholder="activity name ..."
			type="text"
		/>
	</Label>

	<Label for="start">
		<Checkbox id="start" name="start" value=true checked />
		Start immediately
	</Label>

	<Button type="submit" disabled={isLoading || !name}>
		{#if isLoading}
			<Loader2 class="mr-2 h-4 w-4 animate-spin" />
		{/if}
		Create
	</Button>
</form>
