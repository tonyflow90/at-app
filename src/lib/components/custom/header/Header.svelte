<script lang="ts">
	import { page } from '$app/stores';

	import { Separator } from '$components/ui/separator';
	import { Avatar, AvatarFallback, AvatarImage } from '$components/ui/avatar';
	import { Button } from '$components/ui/button';
	import {
		Sheet,
		SheetClose,
		SheetContent,
		SheetDescription,
		SheetFooter,
		SheetHeader,
		SheetTitle,
		SheetTrigger
	} from '$components/ui/sheet';

	import { Menu } from 'lucide-svelte';
	import { User } from 'lucide-svelte';
	import { Github } from 'lucide-svelte';
	import { Instagram } from 'lucide-svelte';
	import { Twitter } from 'lucide-svelte';

	import type { LayoutData } from '../../../../routes/$types';

	import DarkmodeButton from '$components/custom/darkmode/DarkmodeButton.svelte';

	import { routes } from '$lib/routes';
	import SignOut from '../authentication/SignOut.svelte';

	export let data: LayoutData;
</script>

<header class="w-full h-16 md:h-24 flex">
	<start class="flex-none flex h-full items-center align-middle pl-2">
		<div class="grid grid-flow-col gap-2">
			<Sheet>
				<SheetTrigger>
					{#if data.session}
						<Button class="felx md:hidden" variant="ghost">
							<Menu />
						</Button>
					{/if}
				</SheetTrigger>
				<SheetContent class="flex flex-col" position="left" size="full">
					<SheetHeader class="flex-none h-16 md:h-24" />
					<nav class="flex-auto grid-flow-row flex flex-col space-y-6">
						{#each routes as route}
							<SheetClose>
								<a
									class:text-muted-foreground={$page.url.pathname != route.path}
									href={route.path}
									class="font-semibold text-xl transition-colors hover:text-primary"
								>
									{route.name}
								</a>
							</SheetClose>
						{/each}
					</nav>
					<SheetFooter class="w-full flex flex-row justify-items-center items-center">
						<!-- <div class="w-full flex justify-items-stretch"> -->
						<!-- <Button href="https://google.com" variant="link">
							<Github />
						</Button>
						<Button href="https://google.com" variant="link">
							<Instagram />
						</Button>
						<Button href="https://google.com" variant="link">
							<Twitter />
						</Button> -->
						<!-- </div> -->
					</SheetFooter>
				</SheetContent>
			</Sheet>

			<Avatar class="md:ml-8 h-12 w-12 md:h-16 md:w-16">
				<AvatarImage src="/logo.svg" alt="logo" />
				<AvatarFallback>
					<p class="font-thin text-center text-sm">▅▀▅ ▀█▀</p>
				</AvatarFallback>
			</Avatar>
		</div>
	</start>
	<middle class="flex flex-auto h-full align-middle pl-8 pr-8">
		{#if data.session}
			<nav class="align-middle items-center grid-flow-col gap-6 hidden md:grid">
				{#each routes as route}
					<a
						class:text-muted-foreground={$page.url.pathname != route.path}
						href={route.path}
						class="font-semibold text-xl transition-colors hover:text-primary"
					>
						{route.name}
					</a>
				{/each}
			</nav>
		{/if}
	</middle>
	<end class="flex-none flex h-full items-center align-middle pr-2">
		<div class="grid grid-flow-col gap-2">
			<!-- <div class="items-center hidden md:flex">
				<Button href="https://google.com" variant="link">
					<Github />
				</Button>
				<Button href="https://google.com" variant="link">
					<Instagram />
				</Button>
				<Button href="https://google.com" variant="link">
					<Twitter />
				</Button>

				<Separator orientation="vertical" />
			</div> -->

			<Sheet>
				<SheetTrigger>
					<div class="items-center flex">
						{#if data.session && data.session.user}
							<Button variant="ghost">
								{#if data.session.user.image}
									<Avatar className="h-8 w-8">
										<AvatarImage src={data.session.user.image} alt="profile image" />
									</Avatar>
								{:else}
									<User />
								{/if}
							</Button>
						{/if}
					</div>
				</SheetTrigger>
				<SheetContent class="flex flex-col" position="right" size="content">
					<SheetHeader class="flex-none h-16 md:h-24">
						<SheetTitle>
							<!-- <div class="items-center flex">
								{#if data.session && data.session.user}
									{#if data.session.user.image}
										<Avatar className="h-8 w-8">
											<AvatarImage src={data.session.user.image} alt="profile image" />
										</Avatar>
									{:else}
										<User />
									{/if}
									{data.session.user.user_metadata.name}
								{/if}
							</div> -->
						</SheetTitle>
						<SheetDescription>
							<!-- <div class="items-center flex">
								{#if data.session && data.session.user}
									{data.session.user.email}
									{data.session.user.last_sign_in_at}
								{/if}
							</div> -->
						</SheetDescription>
					</SheetHeader>
					<div class="flex-auto flex flex-col space-y-6">
						{#if data.session && data.session.user}
							{#if data.session.user.image}
								<Avatar class="w-full h-full">
									<AvatarImage src={data.session.user.image} alt="profile image" />
								</Avatar>
							{:else}
								<User class="w-full h-full" />
							{/if}
						{/if}
						{#if data.session && data.session.user}
							{data.session.user.email}
							{data.session.user.last_sign_in_at}
						{/if}
					</div>

					<!-- <nav class="flex-auto grid-flow-row flex flex-col space-y-6">
						{#each routes as route}
							<SheetClose>
								<a
									class:text-muted-foreground={$page.url.pathname != route.path}
									href={route.path}
									class="font-semibold text-xl transition-colors hover:text-primary"
								>
									{route.name}
								</a>
							</SheetClose>
						{/each}
					</nav> -->
					<SheetFooter />
				</SheetContent>
			</Sheet>

			<DarkmodeButton />

			{#if data.session}
				<SignOut />
			{/if}
		</div>
	</end>
</header>
