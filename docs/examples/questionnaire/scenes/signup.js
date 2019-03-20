const { Keyboard } = require('vk-io');

const { StepScene } = require('../middlewares/wizard');

const cancelButton = Keyboard.textButton({
	label: 'Cancel',
	color: Keyboard.NEGATIVE_COLOR,
	payload: {
		command: 'cancel'
	}
});

const helpButton = Keyboard.textButton({
	label: 'Help',
	payload: {
		command: 'help'
	}
});

const allowGenders = ['male', 'female'];

module.exports = new StepScene('signup', {
	steps: [
		async (context, { firstTime }) => {
			const { text: username } = context;

			if (firstTime || !username) {
				await context.send({
					message: `
						Please enter your username.
					`,
					keyboard: Keyboard.keyboard([cancelButton])
				});

				return;
			}

			if (username.length < 3 || username.length > 20) {
				await context.send('Username must be at least 3 and no more than 20 characters');

				return;
			}

			context.wizard.state.username = username;

			await context.step.next();
		},
		async (context, { firstTime }) => {
			const { gender: rawGender = context.text } = context.state.payload;

			if (firstTime || !rawGender) {
				await context.send({
					message: `
						Please write you gender or click button
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

				return;
			}

			const gender = rawGender.toLowerCase();

			if (!allowGenders.includes(gender)) {
				await context.send('The gender you entered is not allowed!');

				return;
			}

			context.wizard.state.gender = gender;

			await context.step.next();
		},
		async (context, { firstTime }) => {
			if (firstTime) {
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

				return;
			}

			if (context.state.command === 'skip') {
				await context.send('Age setting skipped');

				await context.step.next();

				return;
			}

			const { text } = context;

			if (text === null) {
				await context.send('Please write how old are you');

				return;
			}

			const age = Number(text);

			if (Number.isNaN(age)) {
				await context.send('Age must be number');

				return;
			}

			context.wizard.state.age = age;

			await context.step.next();
		}
	],
	async onLeave(context, { canceled }) {
		if (canceled) {
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
