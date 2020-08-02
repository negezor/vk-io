import { Readable, PassThrough } from 'stream';
import { SandwichStream } from 'sandwich-stream';

import { isStream } from './helpers';

const CRNL = '\r\n';

export type MultipartStreamBody = NodeJS.ReadableStream | Buffer | string;

export interface IMultipartStreamAddPartOptions {
	headers?: Record<string, string>;
	body: MultipartStreamBody;
}

export class MultipartStream extends SandwichStream {
	/**
	 * Multipart boundary
	 */
	public boundary: string;

	/**
	 * Constructor
	 */
	public constructor(boundary: string) {
		super({
			head: `--${boundary}${CRNL}`,
			tail: `${CRNL}--${boundary}--`,
			separator: `${CRNL}--${boundary}${CRNL}`
		});

		this.boundary = boundary;
	}

	/**
	 * Returns custom tag
	 */
	public get [Symbol.toStringTag](): string {
		return this.constructor.name;
	}

	/**
	 * Adds part
	 */
	public addPart(part: IMultipartStreamAddPartOptions): void {
		const partStream = new PassThrough();

		if (part.headers !== undefined) {
			for (const [key, header] of Object.entries(part.headers)) {
				partStream.write(`${key}:${header}${CRNL}`);
			}
		}

		partStream.write(CRNL);

		if (isStream(part.body)) {
			(part.body as Readable).pipe(partStream);
		} else {
			partStream.end(part.body);
		}

		this.add(partStream);
	}

	/**
	 * Adds form data
	 */
	public append(
		field: string,
		body: MultipartStreamBody,
		{ filename, headers = {} }: {
			filename?: string;
			headers: IMultipartStreamAddPartOptions['headers'];
		}
	): void {
		let header = `form-data; name="${field}"`;

		if (filename !== undefined) {
			header += `; filename="${filename}"`;
		}

		this.addPart({
			headers: {
				...headers,

				// eslint-disable-next-line @typescript-eslint/naming-convention
				'Content-Disposition': header
			},
			body
		});
	}
}
