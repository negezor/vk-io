/* eslint-disable */
import express from 'express';

import { createServer } from 'http';

import { VK } from '../..';

const vk = new VK({
	token: '12345'
});

const app = express();

const callback = vk.updates.getWebhookCallback();

app.use('/vk-webhook', callback);

createServer(callback);
