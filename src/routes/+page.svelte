<script>
	import BlogPostListElement from '$lib/BlogPostListElement/BlogPostListElement.svelte';
	import { posts } from '../stores/posts';
</script>

{#each $posts as post}
	<BlogPostListElement {post} />
{/each}
