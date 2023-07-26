<script lang="ts">
	import { Input } from '$components/ui/input';
	import { Label } from '$components/ui/label';
	import { buttonVariants } from '$components/ui/button';
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogOverlay,
		DialogTitle,
		DialogTrigger
	} from '$components/ui/dialog';
	import { Checkbox } from '$components/ui/checkbox';
	import { Plus } from 'lucide-svelte';
	import Form from '$components/custom/form/Form.svelte';

	let activity = {};

	let checked = true;
	$: activity.start = checked ? new Date() : undefined;

</script>

<Dialog modal={true}>
	<DialogTrigger class={buttonVariants({ variant: 'ghost' })}>
		<Plus />
	</DialogTrigger>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Create Activity</DialogTitle>
			<DialogDescription>Creating and starting an activity.</DialogDescription>
		</DialogHeader>

		<Label>
			<Input
				bind:value={activity.title}
				id="activity"
				name="title"
				placeholder="activity name ..."
				type="text"
			/>
		</Label>

		<Label for="start">
			<Checkbox
				on:change={() => {
					debugger;
				}}
				value={new Date()}
				{checked}
			/>
			Start immediately
		</Label>
		<Label for="start" hidden>
			<Input bind:value={activity.start} id="start" name="start" type="Date" />
 		</Label>

		<DialogFooter>
			<Form action="?/createActivity" data={activity}>
				Create <Plus />
			</Form>
		</DialogFooter>
	</DialogContent>
</Dialog>
