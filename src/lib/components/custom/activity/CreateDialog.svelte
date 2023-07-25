<script lang="ts">
	import { Button, buttonVariants } from '$components/ui/button';
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from '$components/ui/dialog';
	import { Plus } from 'lucide-svelte';

	import CreateActivity from './Create.svelte';
</script>

<Dialog modal={true}>
	<DialogTrigger class={buttonVariants({ variant: 'ghost' })}>
		<Plus />
	</DialogTrigger>
	<DialogContent class="w-full">
		<DialogHeader>
			<DialogTitle>Create new activity.</DialogTitle>
		</DialogHeader>

		<CreateActivity />
	</DialogContent>
</Dialog>
