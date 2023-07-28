<script>
	// shacdn
	import { Input } from '$components/ui/input';
	import { Label } from '$components/ui/label';

	// lucide

	// self
	import Form from '$components/custom/form/Form.svelte';

	let email = '',
		password1 = '',
		password2 = '';
</script>

<div class="grid gap-2">
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
			bind:value={password1}
		/>
		<Label for="password2">Password</Label>
		<Input
			id="password2"
			type="password"
			autoCapitalize="none"
			autoComplete="current-password"
			autoCorrect="off"
			bind:value={password2}
		/>
		{#if password1 != password2}
			<p class="text-destructive">The passwords do not match</p>
		{/if}
	</div>
</div>
<Form
	variant="default"
	disabled={(!email || !password1 || !password2) && password1 == password2}
	action="?/signup"
	data={{ email: email, password: password1 }}
>
	<p class="pr-4">Sign Up</p>
</Form>
