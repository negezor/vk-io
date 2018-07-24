import { VK, Context } from '..';

const vk = new VK();

describe('Contexts', () => {
	describe('Context', () => {
		describe('#context.is()', () => {
			const getContext = () => {
				const context = new Context(vk);

				context.type = 'message';
				context.subTypes = ['edit_message', 'text'];

				return context;
			};

			it('should return true when the required types are present', () => {
				const context = getContext();

				expect(context.is('message')).toBe(true);
				expect(context.is('edit_message')).toBe(true);

				expect(context.is(['new_message', 'text'])).toBe(true);
				expect(context.is(['message', 'edit_message'])).toBe(true);
			});

			it('should return false if the required types are not present', () => {
				const context = getContext();

				expect(context.is('test')).toBe(false);
				expect(context.is('sub_test')).toBe(false);

				expect(context.is(['test', 'sub_test'])).toBe(false);
			});
		});
	});
});
