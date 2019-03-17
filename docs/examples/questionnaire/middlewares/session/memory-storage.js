module.exports = class MemoryStorage {
	constructor() {
		this.store = new Map(); // OR use LRU-Cache
	}

	async has(key) {
		return this.store.has(key);
	}

	async get(key) {
		return this.store.get(key) || null;
	}

	async set(key, value) {
		return this.store.set(key, value);
	}

	async delete(key) {
		return this.store.delete(key);
	}
};
