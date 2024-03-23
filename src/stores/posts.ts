import { writable, type Writable } from 'svelte/store';

export const posts: Writable<{ id: number; username: string; content: string }[]> = writable([]);

async function fetchPosts() {
	try {
		const res = await fetch('http://localhost:8080/blogPost');
		const data = await res.json();
		posts.set(data);
	} catch (e) {
		// TODO: handle error
		console.log(e);
	}
}

fetchPosts();
