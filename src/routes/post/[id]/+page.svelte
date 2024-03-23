<script>
	/** @type {import('./$types').PageData} */
	export let data;
	const { post, comments } = data;
</script>

{#if !post}
	Fuck hou
{:else}
	<div class="container">
		<div class="post">
			<h2>{post.username}#{post.id}</h2>
			<p>{post.content}</p>
			<p>User: {post.username}</p>
		</div>
		<div class="ad">
			<h4>Advertisement</h4>
			<p>Ad content goes here...</p>
		</div>
	</div>
	<div class="comments">
		{#each comments as comment}
			<div class="comment">
				<span class="commenter">Commenter: {comment.username}</span>
				<span class="date">Date: {new Date(comment.createdAt).toUTCString()}</span>
				<p class="comment-content">{comment.content}</p>
			</div>
		{/each}

		<form method="POST" class="input-container">
			<input name="comment-content" type="text" placeholder="Write your comment..." /> <button>Post Comment</button>
		</form>
	</div>
{/if}

<style>
	.container {
		display: flex;
	}

	.post {
		width: 66.6%;
		padding: 20px;
		border-right: 1px solid #333;
	}

	.ad {
		width: 33.3%;
		padding: 20px;
	}

	.comments {
		padding: 20px;
	}

	.comment {
		margin-bottom: 20px;
	}

	.commenter {
		font-size: 14px;
		color: #333;
	}

	.date {
		font-size: 14px;
		color: #333;
		margin-left: 10px;
	}

	.comment-content {
		font-size: 16px;
		color: #333;
	}

	.input-container {
		margin-top: 20px;
	}

	input[type='text'] {
		padding: 5px;
		width: 70%;
	}

	button {
		padding: 5px 10px;
		background-color: #333;
		color: white;
		border: none;
		cursor: pointer;
	}
</style>
