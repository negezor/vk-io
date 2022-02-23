/* eslint-disable */
import Koa from 'koa';

import { VK } from '../..';

const vk = new VK({
	token: '12345'
});

const app = new Koa();

const callback = vk.updates.getKoaWebhookMiddleware();

app.use(callback);
