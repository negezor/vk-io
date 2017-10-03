import VKError from './vk';
import APIError from './api';
import AuthError from './auth';
import UpdatesError from './updates';
import ExecuteError from './execute';

export { apiErrors, authErrors, updatesErrors } from '../util/constants';

export { VKError, APIError, AuthError, UpdatesError, ExecuteError };

export default VKError;
