import ISessionStorage from './storage';

export default class MemoryStorage implements ISessionStorage {
	private store: Map<string, object> = new Map();

	public async has(key: string): Promise<boolean> {
		return this.store.has(key);
	}

	public async get(key: string): Promise<object> {
		return this.store.get(key) || null;
	}

	public async set(key: string, value: object): Promise<boolean> {
		this.store.set(key, value);

		return true;
	}

	public async delete(key: string): Promise<boolean> {
		return this.store.delete(key);
	}
}
