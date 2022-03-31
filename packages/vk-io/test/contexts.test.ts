// @ts-ignore
import {
// @ts-ignore
	VK,
// @ts-ignore

// @ts-ignore
	Context,
// @ts-ignore
	UpdateSource
// @ts-ignore
} from '..';
// @ts-ignore

// @ts-ignore
const vk = new VK({
// @ts-ignore
	token: process.env.TOKEN!
// @ts-ignore
});
// @ts-ignore

// @ts-ignore
const { api, upload } = vk;
// @ts-ignore

// @ts-ignore
describe('Contexts', (): void => {
// @ts-ignore
	describe('Context', (): void => {
// @ts-ignore
		describe('#context.is()', (): void => {
// @ts-ignore
			const getContext = (): Context => {
// @ts-ignore
				const context = new Context({
// @ts-ignore
					api,
// @ts-ignore
					upload,
// @ts-ignore

// @ts-ignore
					type: 'message',
// @ts-ignore
					subTypes: ['edit_message', 'text'],
// @ts-ignore
					payload: {},
// @ts-ignore
					updateType: 'test',
// @ts-ignore
					source: UpdateSource.POLLING
// @ts-ignore
				});
// @ts-ignore

// @ts-ignore
				return context;
// @ts-ignore
			};
// @ts-ignore

// @ts-ignore
			it('should return true when the required types are present', (): void => {
// @ts-ignore
				const context = getContext();
// @ts-ignore

// @ts-ignore
				expect(context.is(['message'])).toBe(true);
// @ts-ignore
				expect(context.is(['edit_message'])).toBe(true);
// @ts-ignore

// @ts-ignore
				expect(context.is(['new_message', 'text'])).toBe(true);
// @ts-ignore
				expect(context.is(['message', 'edit_message'])).toBe(true);
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			it('should return false if the required types are not present', (): void => {
// @ts-ignore
				const context = getContext();
// @ts-ignore

// @ts-ignore
				expect(context.is(['test'])).toBe(false);
// @ts-ignore
				expect(context.is(['sub_test'])).toBe(false);
// @ts-ignore

// @ts-ignore
				expect(context.is(['test', 'sub_test'])).toBe(false);
// @ts-ignore
			});
// @ts-ignore
		});
// @ts-ignore
	});
// @ts-ignore
});
