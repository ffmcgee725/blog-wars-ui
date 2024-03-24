import { fail, type LoadEvent, type RequestEvent } from '@sveltejs/kit';

type RequestError = {
	statusCode: number;
	message: string;
};

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
	post: Post | RequestError;
	comments: Comment[];
};

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params: { id } }: LoadEvent) {
	try {
		const [postResponse, commentsResponse] = await Promise.all([
			fetch(`http://localhost:8080/blogPost/${id}`),
			fetch(`http://localhost:8080/comment?blogPostId=${id}`)
		]);

		return {
			post: await postResponse.json(),
			comments: await commentsResponse.json()
		} as PostDetails;
	} catch (e) {
		console.error(e);
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies, fetch, request, params: { id } }: RequestEvent) => {
		const data = await request.formData();
		const content = data.get('comment-content');
		const jwtToken = cookies.get('AuthorizationToken');

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

		if (response.status >= 400) {
			return fail(response.status);
		}

		return { success: true };
	}
};
