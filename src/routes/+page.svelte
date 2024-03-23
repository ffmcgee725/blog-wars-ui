<script>
	import BlogPostListElement from '$lib/BlogPostListElement/BlogPostListElement.svelte';
	import { posts } from '../stores/posts';
	/** @type {import('./$types').PageData} */
</script>

{#if $posts.length === 0}
	Fuck hou
{:else}
	{#each $posts as post}
		<BlogPostListElement {post} />
	{/each}
{/if}

<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->
