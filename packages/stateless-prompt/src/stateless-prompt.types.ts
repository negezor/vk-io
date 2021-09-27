import { HandlerMiddleware } from './types';

export interface IStatelessPromptManagerOptions {
	/**
	 * The slug should be unique.
	 * It depends on it that the bot will respond and recognize the request.
	 */
	slug: string;

	/**
	 * Handles the prompt
	 *
	 * ```ts
	 * const namePrompt = new StatelessPromptManager({
	 *   slug: 'prompt-name',
	 *   handler: (context, next) => {
	 *     if (!context.text) {
	 *       return context.send('Please reply your name with text to previous message');
	 *     }
	 *
	 *     return context.send(`Your name is ${context.text}`);
	 *   }
	 * });
	 * ```
	 */
	handler: HandlerMiddleware;
}
