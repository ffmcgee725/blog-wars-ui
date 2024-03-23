<script>
	import BlogPostListElement from '$lib/BlogPostListElement/BlogPostListElement.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<!-- Make navbar component -->
<nav class="nav-bar">
	<ul class="nav-list">
		<li>this will be a nav bar with some stuff in it</li>
	</ul>
</nav>

{#if !data.posts}
	Fuck hou
{:else}
	{#each data.posts as post}
		<BlogPostListElement {post} />
	{/each}
{/if}

<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->
<style>
	.nav-bar {
		background-color: #181818;
		min-height: 5vh;
		color: #fff;
	}
	.nav-list {
		list-style: none;
	}
</style>
