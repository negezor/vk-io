const { Keyboard } = require('vk-io');

const { StepScene } = require('../middlewares/wizard');

const cancelButton = Keyboard.textButton({
	label: 'Cancel',
	color: Keyboard.NEGATIVE_COLOR,
	payload: {
		command: 'cancel'
	}
});

const allowGenders = ['male', 'female'];

module.exports = new StepScene('signup', {
	steps: [
		async (context) => {
			await context.send({
				message: `
					Registration, please enter your username.
				`,
				keyboard: Keyboard.keyboard([
					cancelButton
				])
			});

			context.step.next();
		},
		async (context) => {
			const { text: username } = context;

			if (username === null) {
				await context.send('Please write your username!');

				return;
			}

			if (username.length < 3 || username.length > 20) {
				await context.send('Username must be at least 3 and no more than 20 characters');

				return;
			}

			context.wizard.state.username = username;
			context.step.next();

			await context.send({
				message: `
					Please enter your gender
				`,
				keyboard: Keyboard.keyboard([
					[
						Keyboard.textButton({
							label: 'Male',
							payload: {
								gender: 'male'
							}
						}),
						Keyboard.textButton({
							label: 'Female',
							payload: {
								gender: 'female'
							}
						})
					],
					cancelButton
				])
			});
		},
		async (context) => {
			let { gender } = context.state.payload;

			if (!gender) {
				const { text } = context;

				if (text === null) {
					await context.send('Please write you gender or click button');

					return;
				}

				gender = text.toLowerCase();
			}

			if (!allowGenders.includes(gender)) {
				await context.send('The gender you entered is not allowed!');

				return;
			}

			context.wizard.state.gender = gender;
			context.step.next();

			await context.send({
				message: `
					How old are you?
				`,
				keyboard: Keyboard.keyboard([
					Keyboard.textButton({
						label: 'Skip',
						payload: {
							command: 'skip'
						}
					}),
					cancelButton
				])
			});
		},
		async (context) => {
			if (context.state.command === 'skip') {
				context.send('Age setting skipped');

				await context.wizard.leave();

				return;
			}

			const { text } = context;

			if (text === null) {
				await context.send('Please write how old are you');

				return;
			}

			if (!/^\d+$/.test(text)) {
				await context.send('Age must be number');

				return;
			}

			const age = Number(text);

			context.wizard.state.age = age;

			await context.wizard.leave();
		}
	],
	async onLeave(context) {
		const helpButton = Keyboard.textButton({
			label: 'Help',
			payload: {
				command: 'help'
			}
		});

		if (context.state.command === 'cancel') {
			await context.send('Registration canceled', {
				keyboard: Keyboard.keyboard([helpButton])
			});

			return;
		}

		context.session.user = context.wizard.state;

		await context.send('Register completed! Write /profile', {
			keyboard: Keyboard.keyboard([
				[
					Keyboard.textButton({
						label: 'Profile',
						color: Keyboard.PRIMARY_COLOR,
						payload: {
							command: 'profile'
						}
					}),
					helpButton
				]
			])
		});
	}
});
