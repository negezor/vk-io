import ISessionStorage from './storage';

import { Partial } from '../types';

export default class MemoryStorage implements ISessionStorage {
	private store: Map<string, Partial> = new Map();

	async has(key: string) {
		return this.store.has(key);
	}

	async get(key: string) {
		return this.store.get(key) || null;
	}

	async set(key: string, value: Partial) {
		this.store.set(key, value);

		return true;
	}

	async delete(key: string) {
		return this.store.delete(key);
	}
}
