import { strictEqual } from 'node:assert';
import { describe, it } from 'node:test';

import { Context, UpdateSource, VK } from '..';

const vk = new VK({
    // biome-ignore lint/style/noNonNullAssertion: to be honest, they're just tests
    token: process.env.TOKEN!,
});

const { api, upload } = vk;

describe('Contexts', (): void => {
    describe('Context', (): void => {
        describe('#context.is()', (): void => {
            const getContext = (): Context => {
                const context = new Context({
                    api,
                    upload,

                    type: 'message',
                    subTypes: ['edit_message', 'text'],
                    payload: {},
                    updateType: 'test',
                    source: UpdateSource.POLLING,
                });

                return context;
            };

            it('should return true when the required types are present', (): void => {
                const context = getContext();

                strictEqual(context.is(['message']), true);
                strictEqual(context.is(['edit_message']), true);

                strictEqual(context.is(['new_message', 'text']), true);
                strictEqual(context.is(['message', 'edit_message']), true);
            });

            it('should return false if the required types are not present', (): void => {
                const context = getContext();

                strictEqual(context.is(['test']), false);
                strictEqual(context.is(['sub_test']), false);

                strictEqual(context.is(['test', 'sub_test']), false);
            });
        });
    });
});
