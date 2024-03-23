import { fail, redirect, type RequestEvent } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ fetch, request }: RequestEvent) => {
		const data = await request.formData();

		const email = data.get('email');
		if (!email) {
			return fail(400, { email, missing: true });
		}

		const username = data.get('username');
		if (!username) {
			return fail(400, { username, missing: true });
		}

		const password = data.get('password');
		if (!password) {
			return fail(400, { password, missing: true });
		}

		const passwordVerification = data.get('confirm-password');
		if (!passwordVerification) {
			return fail(400, { passwordVerification, missing: true });
		}

		if (password !== passwordVerification) {
			return fail(400, { passwordVerification, password, incorrect: true });
		}

		const body = JSON.stringify({
			email,
			username,
			password,
			passwordVerification
		});

		const response = await fetch('http://localhost:8080/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body
		});

		console.log({ response }); // TODO: if response 201, success: true
		// TODO: if response fails, return fail(400, { email, incorrect: true });

		throw redirect(201, '/');
	}
};
