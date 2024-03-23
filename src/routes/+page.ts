import { type LoadEvent } from '@sveltejs/kit';

export async function load({ fetch }: LoadEvent) {
	try {
		const res = await fetch('http://localhost:8080/blogPost');
		/**
		 * @type {{id: number, username: string, content: string}[]}
		 */
		const posts = await res.json();
		return { posts };
	} catch (e) {
		/**
		 * @type {{code: number, message: string}}
		 */
		console.log(e);
	}
}
