import { IAPIOptions } from './api';
import { IUpdatesOptions } from './updates';
import { IUploadOptions } from './upload';
import { CallbackService } from './utils/callback-service';

export type AllowArray<T> = T | T[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T = {}> = new (...args: any[]) => T;

export type VKOptions = IAPIOptions
& IUpdatesOptions
& IUploadOptions
& {
	callbackService?: CallbackService;
};
