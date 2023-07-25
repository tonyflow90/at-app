<script lang="ts">
	export let data: LayoutData;

	import { Button } from '$components/ui/button';
	import { Input } from '$components/ui/input';
	import { Label } from '$components/ui/label';
	import { Loader2 } from 'lucide-svelte';

	const welcomeTextTitle: string = 'Hello stranger,';
	const welcomeTextDescription: string = 'please use your email to log in or register in the app';

	const verifyTextTitle: string = 'Verify';
	const verifyTextDescription: string = 'please enter the code you have received by mail';

	let email: string = 'tonyflow90@gmail.com',
		password: string = '',
		type: EmailOtpType = 'magiclink',
		atoken: number[] = new Array(6),
		token: string,
		isLoading: boolean = false,
		isSignup: boolean = false,
		isSignin: boolean = false,
		isVerify: boolean = false,
		loginRequestSend: boolean = false;

	const signin = async (event: SubmitEvent) => {
		try {
			isLoading = true;
			isSignin = true;

			if (!email) {
				throw Error('email is required');
			}

			const { error } = await data.supabase.auth.signInWithOtp({
				email: String(email),
				options: { shouldCreateUser: false }
			});

			if (error) {
				if (error?.message) {
					throw Error(error.message);
				}

				throw Error('Server error. Please try again later');
			}

			loginRequestSend = true;
			toast.success('login request send. Please check ur emails!!');
		} catch (error) {
			toast.error(error);
		}
		isLoading = false;
		isSignin = false;
	};

	const signinWithPassword = async (event: SubmitEvent) => {
		try {
			isLoading = true;
			isSignin = true;

			if (!email) {
				throw Error('email is required');
			}

			if (!password) {
				throw Error('password is required');
			}
			const { error } = await data.supabase.auth.signInWithPassword({
				email: String(email),
				password: String(password)
			});

			if (error) {
				if (error?.message) {
					throw Error(error.message);
				}

				throw Error('Server error. Please try again later');
			}

			reset();
			toast.success('login success!');
		} catch (error) {
			toast.error(error);
		}
		isLoading = false;
		isSignin = false;
	};

	const verify = async () => {
		try {
			isLoading = true;
			if (!type) {
				throw Error('type is required');
			}
			if (!email) {
				throw Error('email is required');
			}
			token = atoken.join('');
			if (!token) {
				throw Error('token is required');
			}

			const { error } = await data.supabase.auth.verifyOtp({
				email: String(email),
				token: String(token),
				type: type
			});

			if (error) {
				if (error?.message) {
					throw Error(error.message);
				}

				throw Error('Server error. Please try again later');
			}

			reset();
			toast.success('token verified!');
		} catch (error) {
			toast.error(error);
		}
		isLoading = false;
	};

	const reset = async () => {
		loginRequestSend = false;
		email = '';
		token = '';
	};

	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$components/ui/card';
	import { enhance } from '$app/forms';
	import type { LayoutData } from '../$types';
	import toast, { Toaster } from 'svelte-french-toast';
	import Login from '$components/custom/authentication/Login.svelte';
	import { goto } from '$app/navigation';

	let login = ({ email, password }) => {
		return new Promise(async (resolve, reject) => {
			try {
				const { error } = await data.supabase.auth.signInWithPassword({ email, password });
				if (error) {
					reject(error);
				}
				resolve();
			} catch (error) {
				reject(error);
			}
		});
	};

	let loginError = ({ error }) => {
		toast.error(error?.message);
	};

	let loginSuccess = ({ data }) => {
		toast.success('login success!');
		goto('/');
	};
</script>

<svelte:head>
	<title>Activity Tracker</title>
	<meta name="description" content="Activity Tracker" />
</svelte:head>

<Toaster />

<main class="flex w-full justify-center pt-24">
	{#if !loginRequestSend}
		<Card class="w-full max-w-[320px]">
			<CardHeader>
				<CardTitle class="text-4xl">{welcomeTextTitle}</CardTitle>
				<CardDescription>{welcomeTextDescription}</CardDescription>
			</CardHeader>
			<CardContent class="grid gap-4">
				<Login fnLogin={login} on:error={loginError} on:success={loginSuccess} />
				<form class="grid gap-2" on:submit|preventDefault={signinWithPassword}>
					<div class="grid gap-1">
						<Input type="hidden" name="type" bind:value={type} />
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
						{#if isSignin}
							<Loader2 class="mr-2 h-4 w-4 animate-spin" />
						{/if}
						Sign In
					</Button>
				</form>

				<div class="relative">
					<div class="absolute inset-0 flex items-center">
						<span class="w-full border-t" />
					</div>
					<div class="relative flex justify-center text-xs uppercase">
						<span class="bg-background px-2 text-muted-foreground"> Or </span>
					</div>
				</div>

				<form class="grid gap-2" on:submit|preventDefault={signin}>
					<div class="grid gap-1">
						<Input type="hidden" name="type" bind:value={type} />
						<Label for="email2">Email</Label>
						<Input
							id="email2"
							name="email"
							placeholder="name@example.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							disabled={isLoading}
							bind:value={email}
						/>
					</div>
					<Button disabled={isLoading || !email}>
						{#if isSignin}
							<Loader2 class="mr-2 h-4 w-4 animate-spin" />
						{/if}
						Sign In
					</Button>
				</form>
			</CardContent>
		</Card>
	{:else}
		<Card class="w-full max-w-[320px]">
			<CardHeader>
				<CardTitle class="text-4xl">{verifyTextTitle}</CardTitle>
				<CardDescription>{verifyTextDescription}</CardDescription>
			</CardHeader>
			<CardContent class="grid gap-4">
				<form class="grid gap-2" method="POST" use:enhance={verify}>
					<Input type="hidden" name="type" bind:value={type} />
					<Input
						placeholder="name@example.com"
						type="hidden"
						autoCapitalize="none"
						autoComplete="email"
						autoCorrect="off"
						disabled={isLoading}
						bind:value={email}
					/>
					<div class="flex max-w-md flex-row gap-x-2">
						{#each Array(6) as _, i}
							<Input
								id="token-{i}"
								type="tel"
								inputmode="numeric"
								pattern="[0-9]*"
								maxlength="1"
								required
								on:input={(evt) => {
									if (evt.data.length >= evt.target.maxLength) {
										let el = document.getElementById(`token-${i + 1}`);
										if (el) el.focus();
									}
								}}
								bind:value={atoken[i]}
							/>
						{/each}
					</div>
					<Button disabled={isLoading || email === undefined}>
						{#if isVerify}
							<Loader2 class="mr-2 h-4 w-4 animate-spin" />
						{/if}
						Verify
					</Button>
				</form>
			</CardContent>
		</Card>
	{/if}
</main>

<footer />
