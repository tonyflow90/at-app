<script>
	// svelte
	import { createEventDispatcher } from 'svelte';

	// shacdn
	import { Input } from '$components/ui/input';
	import { Label } from '$components/ui/label';

	// lucide
	import { LogIn } from 'lucide-svelte';

	// self
	import Form from '$components/custom/form/Form.svelte';

	let email = '',
		password = '';
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
			bind:value={password}
		/>
	</div>
</div>
<Form
	variant="default"
	disabled={!email || !password}
	action="?/signin"
	data={{ email: email, password: password }}
>
	<p class="pr-4">Sign In</p>
	<LogIn />
</Form>
