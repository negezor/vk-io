import { Readable, PassThrough } from 'stream';
import { SandwichStream } from 'sandwich-stream';

import { isStream } from './helpers';

const CRNL = '\r\n';

export type MultipartStreamBody = Readable | Buffer | string;

export interface IMultipartStreamAddPartOptions {
	headers?: {
		[key: string]: string;
	};
	body: MultipartStreamBody;
}

export default class MultipartStream extends SandwichStream {
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

		if ('headers' in part) {
			// @ts-ignore
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
		{ filename = null, headers = {} }: {
			filename?: string | null;
			headers: IMultipartStreamAddPartOptions['headers'];
		}
	): void {
		let header = `form-data; name="${field}"`;

		if (filename !== null) {
			header += `; filename="${filename}"`;
		}

		this.addPart({
			headers: {
				...headers,

				'Content-Disposition': header
			},
			body
		});
	}
}
