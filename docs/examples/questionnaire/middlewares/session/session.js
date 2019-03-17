const MemoryStorage = require('./memory-storage');

module.exports = ({
	propertyName = 'session',

	storage = new MemoryStorage(),
	getStorageKey = context => `${context.peerId}:${context.senderId}`
} = {}) => (
	async (context, next) => {
		const storageKey = getStorageKey(context);

		const initialSession = await storage.get(storageKey);

		let changed = false;
		let session = new Proxy(initialSession || {}, {
			set: (target, prop, value) => {
				changed = true;

				target[prop] = value;

				return true;
			}
		});

		Object.defineProperty(context, propertyName, {
			get: () => session,
			set: (newSession) => {
				session = { ...newSession };
				changed = true;
			}
		});

		await next();

		if (!changed) {
			return;
		}

		if (Object.keys(session).length !== 0) {
			await storage.set(storageKey, session);
		} else {
			await storage.delete(storageKey);
		}
	}
);
