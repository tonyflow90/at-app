<script>
	// svelte

	// shacdn
	import { Input } from '$components/ui/input';
	import { Label } from '$components/ui/label';

	// lucide
	import { RotateCcw } from 'lucide-svelte';

	// self
	import Form from '$components/custom/form/Form.svelte';

	let email = '';
</script>

<div class="grid gap-2">
	<div class="grid gap-1">
		<Label for="email">Email</Label>
		<Input
			id="email"
			name="email"
			placeholder="name@example.com"
			type="email"
			autoCapitalize="none"
			autoComplete="email"
			autoCorrect="off"
			bind:value={email}
		/>
	</div>
</div>
<Form variant="default" disabled={!email} action="?/forgotPassword" data={{ email: email }}>
	<p class="pr-4">Reset</p>
	<RotateCcw />
</Form>
