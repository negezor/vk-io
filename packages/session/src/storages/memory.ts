import { ISessionStorage } from './storage';

export interface IMemoryStoreLike<K, V> {
	get(key: K): V | undefined;
	set(key: K, value: V): this | undefined;
	delete(key: K): boolean;
}

export interface IMemoryStorageOptions {
	store: IMemoryStoreLike<string, object>;
}

export class MemoryStorage implements ISessionStorage {
	private store: IMemoryStorageOptions['store'];

	constructor({ store = new Map() }: Partial<IMemoryStorageOptions> = {}) {
		this.store = store;
	}

	public async get(key: string): Promise<object | undefined> {
		return this.store.get(key);
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
