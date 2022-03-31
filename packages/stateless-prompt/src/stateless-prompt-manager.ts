// @ts-ignore
import { getDataHash } from './identifier';
// @ts-ignore

// @ts-ignore
import { MessageContext, Middleware, HandlerMiddleware } from './types';
// @ts-ignore
import { IStatelessPromptManagerOptions } from './stateless-prompt.types';
// @ts-ignore

// @ts-ignore
export class StatelessPromptManager {
// @ts-ignore
	protected slug: string;
// @ts-ignore

// @ts-ignore
	protected uniqueIdentifier: string;
// @ts-ignore

// @ts-ignore
	protected handler: HandlerMiddleware;
// @ts-ignore

// @ts-ignore
	public constructor({ slug, handler }: IStatelessPromptManagerOptions) {
// @ts-ignore
		this.slug = slug;
// @ts-ignore
		this.uniqueIdentifier = getDataHash(slug);
// @ts-ignore

// @ts-ignore
		this.handler = handler;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * The suffix to add to the end of the message.
// @ts-ignore
	 * Due to this, the bot understands who is being addressed.
// @ts-ignore
	 *
// @ts-ignore
	 * ```ts
// @ts-ignore
	 * context.send('How old are you? Please reply to this message. ' + agePrompt.suffix);
// @ts-ignore
	 * ```
// @ts-ignore
	 */
// @ts-ignore
	public get suffix(): string {
// @ts-ignore
		return this.uniqueIdentifier;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the middleware for intercept
// @ts-ignore
	 *
// @ts-ignore
	 * ```ts
// @ts-ignore
	 * updates.on('message_new', agePrompt.middlewareIntercept);
// @ts-ignore
	 * ```
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line class-methods-use-this
// @ts-ignore
	public get middlewareIntercept(): Middleware<MessageContext> {
// @ts-ignore
		return (context: MessageContext, next: Function): unknown => {
// @ts-ignore
			const { replyMessage } = context;
// @ts-ignore

// @ts-ignore
			if (!replyMessage?.text?.endsWith(this.uniqueIdentifier)) {
// @ts-ignore
				return next();
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			return this.handler(context, next);
// @ts-ignore
		};
// @ts-ignore
	}
// @ts-ignore
}
