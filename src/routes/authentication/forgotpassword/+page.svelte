<script>
	import { Button, buttonVariants } from '$components/ui/button';
	import { Github } from 'lucide-svelte';

	const forgotTextTitle = 'Forgot your Password?';
	const forgotTextDescription = 'please use your email to get a reset it';

	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$components/ui/card';

	import { base } from '$app/paths';
	import ForgotPassword from '$components/custom/authentication/ForgotPassword.svelte';
</script>

<svelte:head>
	<title>Authentication</title>
	<meta name="description" content="Authentication" />
</svelte:head>

<div class="flex w-full justify-center pt-24">
	<Card class="w-full max-w-[320px]">
		<CardHeader>
			<CardTitle class="text-4xl">{forgotTextTitle}</CardTitle>
			<CardDescription>{forgotTextDescription}</CardDescription>
		</CardHeader>
		<CardContent class="grid gap-4">
			<ForgotPassword />
		</CardContent>
		<CardFooter />
	</Card>
</div>
