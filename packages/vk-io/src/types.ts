import { IAPIOptions } from './api';
import { IUpdatesOptions } from './updates';
import { IUploadOptions } from './upload';
import { CallbackService } from './utils/callback-service';

export type AllowArray<T> = T | T[];

export type Constructor<T = object> = new (...args: any[]) => T;

export type VKOptions = IAPIOptions
& IUpdatesOptions
& IUploadOptions
& {
    callbackService?: CallbackService;
};
