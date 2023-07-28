<script>
	import { Button, buttonVariants } from '$components/ui/button';
	import { Github } from 'lucide-svelte';

	const welcomeTextTitle = 'Welcome back,';
	const welcomeTextDescription = 'please use the following methods to sign in';

	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$components/ui/card';

	import Signin from '$components/custom/authentication/Signin.svelte';
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Authentication</title>
	<meta name="description" content="Authentication" />
</svelte:head>

<div class="flex w-full justify-center pt-24">
	<Card class="w-full max-w-[320px]">
		<CardHeader>
			<CardTitle class="text-4xl">{welcomeTextTitle}</CardTitle>
			<CardDescription>{welcomeTextDescription}</CardDescription>
		</CardHeader>
		<CardContent class="grid gap-4">
			<Button variant="default">
				<p class="pr-4">Signin with Google</p>
			</Button>

			<Button variant="default">
				<p class="pr-4">Signin with</p>
				<Github />
			</Button>

			<div class="relative">
				<div class="absolute inset-0 flex items-center">
					<span class="w-full border-t" />
				</div>
				<div class="relative flex justify-center text-xs uppercase">
					<span class="bg-background px-2 text-muted-foreground"> Or </span>
				</div>
			</div>
			<Signin />
		</CardContent>
		<CardFooter>
			<a href="{base}/authentication/forgotpassword" class={buttonVariants({ variant: 'link' })}>
				Forgot password?
			</a>

			<a href="{base}/authentication/signup" class={buttonVariants({ variant: 'link' })}>
				Signup
			</a>
		</CardFooter>
	</Card>
</div>
