import { VK, Context, UpdateSource } from '..';

const vk = new VK();

describe('Contexts', (): void => {
	describe('Context', (): void => {
		describe('#context.is()', (): void => {
			const getContext = (): Context => {
				const context = new Context({
					vk,
					type: 'message',
					subTypes: ['edit_message', 'text'],
					payload: {},
					updateType: 'test',
					source: UpdateSource.POLLING
				});

				return context;
			};

			it('should return true when the required types are present', (): void => {
				const context = getContext();

				expect(context.is('message')).toBe(true);
				expect(context.is('edit_message')).toBe(true);

				expect(context.is(['new_message', 'text'])).toBe(true);
				expect(context.is(['message', 'edit_message'])).toBe(true);
			});

			it('should return false if the required types are not present', (): void => {
				const context = getContext();

				expect(context.is('test')).toBe(false);
				expect(context.is('sub_test')).toBe(false);

				expect(context.is(['test', 'sub_test'])).toBe(false);
			});
		});
	});
});
