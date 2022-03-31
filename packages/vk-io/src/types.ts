// @ts-ignore
import { IAPIOptions } from './api';
// @ts-ignore
import { IUpdatesOptions } from './updates';
// @ts-ignore
import { IUploadOptions } from './upload';
// @ts-ignore
import { CallbackService } from './utils/callback-service';
// @ts-ignore

// @ts-ignore
export type AllowArray<T> = T | T[];
// @ts-ignore

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
export type Constructor<T = {}> = new (...args: any[]) => T;
// @ts-ignore

// @ts-ignore
export type VKOptions = IAPIOptions
// @ts-ignore
& IUpdatesOptions
// @ts-ignore
& IUploadOptions
// @ts-ignore
& {
// @ts-ignore
	callbackService?: CallbackService;
// @ts-ignore
};
