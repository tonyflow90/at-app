<script lang="ts">

	const signupTextTitle: string = 'Hello stranger,';
	const signupTextDescription: string = 'please use your email to signup';

	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$components/ui/card';
	import Signup from '$components/custom/authentication/Signup.svelte';

</script>

<svelte:head>
	<title>Activity Tracker</title>
	<meta name="description" content="Activity Tracker" />
</svelte:head>

<div class="flex w-full justify-center pt-24">
	<Card class="w-full max-w-[320px]">
		<CardHeader>
			<CardTitle class="text-4xl">{signupTextTitle}</CardTitle>
			<CardDescription>{signupTextDescription}</CardDescription>
		</CardHeader>
		<CardContent class="grid gap-4">
			<Signup />
		</CardContent>
	</Card>
</div>