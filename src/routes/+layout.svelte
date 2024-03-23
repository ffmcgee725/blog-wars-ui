<!-- Make navbar component -->
<nav class="nav-bar">
	<a href="/">Home</a>
	<a href="/login">Login</a>
	<a href="/register">Register</a>
</nav>
<div class="header"><h1>Blog Wars</h1></div>
<slot />

<style>
	.header {
		background-color: #333;
		color: white;
		text-align: center;
		padding: 10px;
	}

	.nav-bar {
		background-color: #181818;
		min-height: 5vh;
		color: #fff;
	}
</style>
