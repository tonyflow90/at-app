<script lang="ts">
    import { base } from "$app/paths";

    import { page } from "$app/stores";
    import { routes } from "$lib/routes";
</script>

<nav
    class="flex items-center justify-between flex-wrap bg-primary text-primary dark:bg-primary-dark dark:text-primary-dark p-3 z-10	"
>
    <div class="block lg:hidden">
        <button
            class="flex items-center px-3 py-2  hover:text-accent hover:border-accent"
            on:click={toggle}
        >
            <svg
                id="nav-menu"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                />
            </svg>
            <svg
                id="nav-close"
                class="h-6 w-6 hidden"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </button>
    </div>

    <div class="flex items-center mr-2">
        <img
            class="fill-current h-16 w-16 mr-2"
            src="{base}/logo128x128.png"
            alt="Logo"
        />
        <span class="font-semibold text-xl tracking-tight">{title}</span>
    </div>

    <ul
        id="nav-content"
        class="w-full block flex-grow lg:flex lg:items-center lg:w-auto text-xl lg:flex-grow hidden ml-16"
    >
        {#each routes as route}
            <li class:active={$page.url.pathname.path === route.path}>
                <a
                    sveltekit:prefetch
                    href={route.path}
                    on:click={toggle}
                    class="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-accent"
                >
                    {route.name}
                </a>
            </li>
        {/each}
    </ul>

    <Darkmode />

    <ul
        id="nav-content-mobile"
        class="w-full block flex-grow lg:flex lg:items-center lg:w-auto text-xl lg:flex-grow hidden lg:hidden"
    >
        {#each routes as route}
            <li class:active={$page.url.pathname.path === route.path}>
                <a
                    sveltekit:prefetch
                    href={route.path}
                    on:click={toggle}
                    class="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-accent"
                >
                    {route.name}
                </a>
            </li>
        {/each}
    </ul>
</nav>
