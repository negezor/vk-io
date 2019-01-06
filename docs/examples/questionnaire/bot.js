const { VK, Keyboard } = require('vk-io');

const { Wizard } = require('./middlewares/wizard');
const { getSessionMiddleware } = require('./middlewares/session');

const scenes = require('./scenes');

const vk = new VK({
	token: process.env.TOKEN,
	pollingGroupId: process.env.GROUP_ID
});

const wizard = new Wizard();

// Register scenes
for (const scene of scenes) {
	wizard.addScene(scene);
}

vk.updates.use(async (context, next) => {
	if (
		context.type === 'message'
		&& (
			// Ignore is outbox message
			context.isOutbox
			// Ignore is bot (group)
			|| context.senderId < 0
		)
	) {
		return;
	}

	try {
		await next();
	} catch (error) {
		console.error('Error:', error);
	}
});

vk.updates.on('message', (context, next) => {
	const { messagePayload } = context;

	context.state.payload = messagePayload || {};
	context.state.command = messagePayload && messagePayload.command
		? messagePayload.command
		: 'help';

	return next();
});

// Register session middleware
vk.updates.on('message', getSessionMiddleware());
// Register wizard middleware
vk.updates.on('message', wizard.getMiddleware());

vk.updates.on('message', (context, next) => {
	if (!context.wizard.current) {
		return next();
	}

	// Global cancel
	if (context.state.command === 'cancel') {
		return context.wizard.leave();
	}

	return context.wizard.reenter();
});

const hearCommand = (name, conditions, handle) => {
	if (typeof handle !== 'function') {
		handle = conditions;
		conditions = [`/${name}`];
	}

	if (!Array.isArray(conditions)) {
		conditions = [conditions];
	}

	vk.updates.hear(
		[
			(text, { state }) => (
				state.command === name
			),
			...conditions
		],
		handle
	);
};

// Handle start button
vk.updates.hear(
	(text, { state }) => (
		state.command === 'start'
	),
	(context, next) => {
		context.state.command = 'help';

		return Promise.all([
			context.send('Hello!'),
			next()
		]);
	}
);

hearCommand('profile', async (context) => {
	const { user } = context.session;

	if (!user) {
		await context.send('You are not registred, use /signup for register');
	}

	const gender = user.gender === 'male'
		? '♂'
		: '♀';

	await context.send(`
		Your profile:

		${gender} ${user.username}${user.age ? `, ${user.age} ages` : ''}
	`);
});

hearCommand('signup', async (context) => {
	if (context.session.user) {
		await context.send('You already registered, use /profile to show profile');

		return;
	}

	// Go to the register scene
	await context.wizard.enter('signup');
});

hearCommand('signout', async (context, next) => {
	if (!context.session.user) {
		await context.send('You are not logged');
	}

	delete context.session.user;

	context.state.command = 'help';

	await Promise.all([
		context.send('You are sign out of your account.'),
		next()
	]);
});

hearCommand('help', async (context) => {
	const hasUser = Boolean(context.session.user);

	const profileText = hasUser
		? `
			/profile -- Profile
			/signout -- Sign Out
		`
		: '/signup - Sign Up';

	await context.send({
		message: `
			My commands list

			/help -- Commands list
			${profileText.trim()}
		`,
		keyboard: Keyboard.keyboard([
			Keyboard.textButton({
				label: 'Help',
				payload: {
					command: 'help'
				}
			}),
			hasUser
				? [
					Keyboard.textButton({
						label: 'Profile',
						payload: {
							command: 'profile'
						}
					}),
					Keyboard.textButton({
						label: 'Sign Out',
						payload: {
							command: 'signout'
						}
					})
				]
				: Keyboard.textButton({
					label: 'Sign Up',
					payload: {
						command: 'signup'
					}
				})
		])
	});
});

async function run() {
	await vk.updates.startPolling();

	console.log('Polling started');
}

run().catch(console.error);
