import { NextResponse } from 'next/server';

class HttpError extends Error {
	public statusCode: number;
	public body: object;

	constructor(statusCode: number, body: object) {
		super(`HTTP Error: ${statusCode}`);
		this.statusCode = statusCode;
		this.body = body;
	}
}

const handleApiError = (error: unknown): NextResponse => {
	if (error instanceof HttpError) {
		return NextResponse.json({ ok: false, ...error.body }, { status: error.statusCode });
	}

	if (error instanceof Error) {
		return NextResponse.json({ ok: false, status: error.name, message: error.message }, { status: 500 });
	}

	// Default error response for unexpected errors
	return NextResponse.json({ ok: false, status: 'error', message: 'An unexpected error occurred' }, { status: 500 });
};

export { HttpError, handleApiError };
