// @ts-ignore
/* eslint-disable */
// @ts-ignore
import express from 'express';
// @ts-ignore

// @ts-ignore
import { createServer } from 'http';
// @ts-ignore

// @ts-ignore
import { VK } from '../..';
// @ts-ignore

// @ts-ignore
const vk = new VK({
// @ts-ignore
	token: '12345'
// @ts-ignore
});
// @ts-ignore

// @ts-ignore
const app = express();
// @ts-ignore

// @ts-ignore
const callback = vk.updates.getWebhookCallback();
// @ts-ignore

// @ts-ignore
app.use('/vk-webhook', callback);
// @ts-ignore

// @ts-ignore
createServer(callback);
