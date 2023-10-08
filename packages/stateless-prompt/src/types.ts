import { MessageContext } from 'vk-io';

export type Middleware<T> = (context: T, next: () => Promise<void>) => unknown;

export type HandlerMiddleware = Middleware<MessageContext>;

export { MessageContext };
