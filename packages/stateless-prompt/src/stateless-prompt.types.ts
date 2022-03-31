// @ts-ignore
import { HandlerMiddleware } from './types';
// @ts-ignore

// @ts-ignore
export interface IStatelessPromptManagerOptions {
// @ts-ignore
	/**
// @ts-ignore
	 * The slug should be unique.
// @ts-ignore
	 * It depends on it that the bot will respond and recognize the request.
// @ts-ignore
	 */
// @ts-ignore
	slug: string;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Handles the prompt
// @ts-ignore
	 *
// @ts-ignore
	 * ```ts
// @ts-ignore
	 * const namePrompt = new StatelessPromptManager({
// @ts-ignore
	 *   slug: 'prompt-name',
// @ts-ignore
	 *   handler: (context, next) => {
// @ts-ignore
	 *     if (!context.text) {
// @ts-ignore
	 *       return context.send('Please reply your name with text to previous message');
// @ts-ignore
	 *     }
// @ts-ignore
	 *
// @ts-ignore
	 *     return context.send(`Your name is ${context.text}`);
// @ts-ignore
	 *   }
// @ts-ignore
	 * });
// @ts-ignore
	 * ```
// @ts-ignore
	 */
// @ts-ignore
	handler: HandlerMiddleware;
// @ts-ignore
}
