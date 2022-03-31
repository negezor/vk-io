// @ts-ignore
import { MessageContext } from 'vk-io';
// @ts-ignore

// @ts-ignore
export type Middleware<T> = (context: T, next: Function) => unknown;
// @ts-ignore

// @ts-ignore
export type HandlerMiddleware = Middleware<MessageContext>;
// @ts-ignore

// @ts-ignore
export { MessageContext };
