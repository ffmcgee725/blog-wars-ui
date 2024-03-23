<script>
	import { goto } from '$app/navigation';
	/**
	 * @type {{id: number, username: string, content: string}}
	 */
	export let post;
</script>

<a href={`/post/${post.id}`}>
	<div>
		<h2>{post.username}</h2>
		<p>{post.content}</p>
	</div>
</a>

<!--  Example with onclick handler
<div
	on:click={() => {
		goto(`/blogPost/${post.id}`);
	}}
>
	<h2>{post.username}</h2>
	<p>{post.content}</p>
</div> -->
