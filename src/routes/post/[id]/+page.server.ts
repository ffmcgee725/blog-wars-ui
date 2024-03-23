import { type LoadEvent, type RequestEvent } from '@sveltejs/kit';

type Post = {
	id: number;
	userId: number;
	username: string;
	content: string;
	createdAt: Date;
};
type Comment = {
	content: string;
	username: string;
	createdAt: Date;
	updatedAt: Date;
};

type PostDetails = {
	post: Post;
	comments: Comment[];
};

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params: { id } }: LoadEvent) {
	try {
		// TODO: rename this better, perhaps consider using axios so you don't need to await res.json()
		const [postRes, commentaries] = await Promise.all([
			fetch(`http://localhost:8080/blogPost/${id}`),
			fetch(`http://localhost:8080/comment?blogPostId=${id}`)
		]);

		/**
		 * TODO: .json() returns object with message and statusCode (error) if request fails. How should we handle this ?
		 * solution: .json() should be type Post or Error, make verification in UI if object.statusCode, render object.message
		 */
		// console.log({inting: await postRes.json()})
		// console.log({inting: await commentaries.json()})

		return { post: await postRes.json(), comments: await commentaries.json() } as PostDetails;
	} catch (e) {
		console.log({ e });
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies, fetch, request, params: { id } }: RequestEvent) => {
		const data = await request.formData();
		const content = data.get('comment-content');
		cookies.delete('AuthorizationToken', {
			httpOnly: true, // The httpOnly  option is set to  true  to prevent the cookie from being accessed by JavaScript. This is a good practice to prevent XSS attacks.
			path: '/',
			secure: true,
			sameSite: 'strict'
		});

		const jwtToken = cookies.get('AuthorizationToken');
		// TODO: add something if no jwtToken ?

		const body = JSON.stringify({
			content,
			blogPostId: id
		});

		const response = await fetch('http://localhost:8080/comment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${jwtToken}`
			},
			body
		});

		console.log({ response }); // TODO: if response 201, success: true
		// TODO: if response fails, return fail(400, { email, incorrect: true });

		return { success: true };
	}
};
