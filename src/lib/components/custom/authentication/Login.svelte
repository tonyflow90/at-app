<script>
	// svelte
	import { createEventDispatcher } from 'svelte';

	// shacdn
	import { Button } from '$components/ui/button';
	import { Input } from '$components/ui/input';
	import { Label } from '$components/ui/label';

	// lucide
	import { Loader2 } from 'lucide-svelte';

	// variables
	const dispatch = createEventDispatcher();

	let email = 'tonyflow90@gmail.com',
		password = '',
		isLoading = false,
		loginRequestSend = false;

	// properties
	export let data = undefined;

	// functions
	export let fnLogin = async ({ email, password }) => {
		return new Promise((resolve, reject) => {
			try {
				console.log('Success', event);
				resolve();
			} catch (error) {
				reject(error);
			}
		});
	};

	const login = async (event) => {
		try {
			isLoading = true;

			if (!email) {
				dispatch('error', { error: { message: 'email is required' } });
			}

			if (!password) {
				dispatch('error', { error: { message: 'password is required' } });
			}

			const result = await fnLogin({ email, password });

			reset();
			dispatch('success', { data: result });
		} catch (error) {
			if (error?.message) dispatch('error', { error: { message: error.message } });
			else dispatch('error', { error: { message: error } });
		}
		isLoading = false;
	};

	const reset = async () => {
		loginRequestSend = false;
		email = '';
		password = '';
	};
</script>

<form class="grid gap-2" on:submit|preventDefault={login}>
	<div class="grid gap-1">
		<Label for="email1">Email</Label>
		<Input
			id="email1"
			name="email"
			placeholder="name@example.com"
			type="email"
			autoCapitalize="none"
			autoComplete="email"
			autoCorrect="off"
			disabled={isLoading}
			bind:value={email}
		/>
		<Label for="password1">Password</Label>
		<Input
			id="password1"
			name="password"
			type="password"
			autoCapitalize="none"
			autoComplete="current-password"
			autoCorrect="off"
			disabled={isLoading}
			bind:value={password}
		/>
	</div>
	<Button disabled={isLoading || !email || !password}>
		{#if isLoading}
			<Loader2 class="mr-2 h-4 w-4 animate-spin" />
		{/if}
		Sign In
	</Button>
</form>
