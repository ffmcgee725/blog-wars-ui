<script>
	import { enhance } from '$app/forms';
	/**
	 * @type {boolean}
	 */
	export let isRegistrationForm = false;
</script>

<!-- Useful docs on jwt auth 
https://www.okupter.com/blog/handling-auth-with-jwt-in-sveltekit -->

<div class="container">
	<h2>{isRegistrationForm ? 'Register' : 'Login'} Page</h2>
	<form method="POST" use:enhance>
		<label for="username">Username</label>
		<input type="text" id="username" name="username" required />
		{#if isRegistrationForm}
			<label for="email">Email</label>
			<input type="email" id="email" name="email" required />
		{/if}
		<label for="password">Password</label>
		<input type="password" id="password" name="password" required />
		{#if isRegistrationForm}
			<label for="confirm-password">Confirm Password</label>
			<input type="password" id="confirm-password" name="confirm-password" required />
		{/if}
		<button>{isRegistrationForm ? 'Register' : 'Login'}</button>
	</form>
</div>

<style>
	.container {
		width: 50%;
		margin: 100px auto;
		background-color: #fff;
		padding: 20px;
		border-radius: 5px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	}

	form {
		display: flex;
		flex-direction: column;
	}

	label {
		font-weight: bold;
		margin-bottom: 5px;
	}

	input {
		padding: 5px;
		margin-bottom: 10px;
		border: 1px solid #ccc;
		border-radius: 3px;
	}

	button {
		background-color: #007bff;
		color: #fff;
		padding: 10px;
		border: none;
		border-radius: 3px;
		cursor: pointer;
	}

	button:hover {
		background-color: #0056b3;
	}
</style>
