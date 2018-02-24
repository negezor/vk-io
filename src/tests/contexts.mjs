import { assert, expect } from 'chai';

import VK from '../vk';

import { Context } from '../structures/contexts';

const { NODE_ENV = 'development' } = process.env;

const vk = new VK();

describe('Contexts', () => {
	describe('Context', () => {
		describe('#context.is', () => {
			const getContext = () => {
				const context = new Context(vk);

				context.type = 'message';
				context.subTypes = ['edit_message', 'text'];

				return context;
			};

			it('should return true when the required types are present', () => {
				const context = getContext();

				expect(context.is('message')).to.equal(true);
				expect(context.is('edit_message')).to.equal(true);

				expect(context.is(['new_message', 'text'])).to.equal(true);
				expect(context.is(['message', 'edit_message'])).to.equal(true);
			});

			it('should return false if the required types are not present', () => {
				const context = getContext();

				expect(context.is('test')).to.equal(false);
				expect(context.is('sub_test')).to.equal(false);

				expect(context.is(['test', 'sub_test'])).to.equal(false);
			});
		});
	});
});
