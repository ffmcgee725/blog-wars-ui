import { error, fail, redirect, type RequestEvent } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ fetch, request, cookies }: RequestEvent) => {
		const data = await request.formData();

		const username = data.get('username');
		if (!username) {
			return fail(400, { username, missing: true });
		}

		const password = data.get('password');
		if (!password) {
			return fail(400, { password, missing: true });
		}

		const body = JSON.stringify({
			username,
			password
		});

		try {
			const response = await fetch('http://localhost:8080/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body
			});

			if (response.status >= 400) {
				return error(response.status, { message: response.statusText });
			}

			const accessToken = (await response.json()).accessToken;

			cookies.set('AuthorizationToken', `Bearer ${accessToken}`, {
				httpOnly: true, // The httpOnly  option is set to  true  to prevent the cookie from being accessed by JavaScript. This is a good practice to prevent XSS attacks.
				path: '/',
				secure: true,
				sameSite: 'strict'
			});

			throw redirect(302, '/');
		} catch (e) {
			console.error(e);
		}
	}
};
