const { Keyboard } = require('vk-io');

const baseBuilder = Keyboard.builder();

// Maybe user is not register
const userIsNotRegistered = true;

if (userIsNotRegistered) {
	baseBuilder.textButton({
		label: 'Sign Up',
		payload: {
			command: 'sign_up'
		}
	});
}

const shopBuilder = baseBuilder.clone();

shopBuilder
	.textButton({
		label: 'Buy a coffee',
		payload: {
			command: 'buy',
			item: 'coffee'
		}
	})
	.textButton({
		label: 'Buy a tea',
		payload: {
			command: 'buy',
			item: 'tea'
		}
	})
	.row()
	.textButton({
		label: 'Go back',
		payload: {
			command: 'go_back'
		}
	});

console.log('Base builder', String(baseBuilder));

console.log('\nShop builder', String(shopBuilder));
