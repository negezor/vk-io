import type { IAPIOptions } from './api';
import type { IUpdatesOptions } from './updates';
import type { IUploadOptions } from './upload';

import type { CallbackService } from './utils/callback-service';

export type AllowArray<T> = T | T[];

export type Constructor<T = object> = new (...args: any[]) => T;

export type VKOptions = IAPIOptions &
    IUpdatesOptions &
    IUploadOptions & {
        callbackService?: CallbackService;
    };
