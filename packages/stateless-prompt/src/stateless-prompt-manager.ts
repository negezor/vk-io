import { getDataHash } from './identifier';

import { MessageContext, Middleware, HandlerMiddleware } from './types';
import { IStatelessPromptManagerOptions } from './stateless-prompt.types';

export class StatelessPromptManager {
	protected slug: string;

	protected uniqueIdentifier: string;

	protected handler: HandlerMiddleware;

	public constructor({ slug, handler }: IStatelessPromptManagerOptions) {
		this.slug = slug;
		this.uniqueIdentifier = getDataHash(slug);

		this.handler = handler;
	}

	/**
	 * The suffix to add to the end of the message.
	 * Due to this, the bot understands who is being addressed.
	 *
	 * ```ts
	 * context.send('How old are you? Please reply to this message. ' + agePrompt.suffix);
	 * ```
	 */
	public get suffix(): string {
		return this.uniqueIdentifier;
	}

	/**
	 * Returns the middleware for intercept
	 *
	 * ```ts
	 * updates.on('message_new', agePrompt.middlewareIntercept);
	 * ```
	 */
	// eslint-disable-next-line class-methods-use-this
	public get middlewareIntercept(): Middleware<MessageContext> {
		return (context: MessageContext, next: Function): unknown => {
			const { replyMessage } = context;

			if (!replyMessage?.text?.endsWith(this.uniqueIdentifier)) {
				return next();
			}

			return this.handler(context, next);
		};
	}
}
