import ISessionStorage from './storage';

export default class MemoryStorage implements ISessionStorage {
	private store: Map<string, object> = new Map();

	async has(key: string): Promise<boolean> {
		return this.store.has(key);
	}

	async get(key: string): Promise<object> {
		return this.store.get(key) || null;
	}

	async set(key: string, value: object): Promise<boolean> {
		this.store.set(key, value);

		return true;
	}

	async delete(key: string): Promise<boolean> {
		return this.store.delete(key);
	}
}
