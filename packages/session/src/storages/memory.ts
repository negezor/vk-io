import ISessionStorage from './storage';

export interface IMemoryStoreLike<K, V> {
	get(key: K): V | undefined;
	set(key: K, value: V): this | undefined;
	delete(key: K): boolean | undefined;
}

export interface IMemoryStorageOptions {
	store?: IMemoryStoreLike<string, object>;
}

export default class MemoryStorage implements ISessionStorage {
	private store: IMemoryStorageOptions['store'];

	constructor({ store = new Map() }: IMemoryStorageOptions = {}) {
		this.store = store;
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

	// eslint-disable-next-line class-methods-use-this
	public async touch(): Promise<void> {
		// ...
	}
}
