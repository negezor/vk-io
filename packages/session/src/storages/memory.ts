// @ts-ignore
import { ISessionStorage } from './storage';
// @ts-ignore

// @ts-ignore
export interface IMemoryStoreLike<K, V> {
// @ts-ignore
	get(key: K): V | undefined;
// @ts-ignore
	set(key: K, value: V): this | undefined;
// @ts-ignore
	delete(key: K): boolean;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface IMemoryStorageOptions {
// @ts-ignore
	store: IMemoryStoreLike<string, object>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export class MemoryStorage implements ISessionStorage {
// @ts-ignore
	private store: IMemoryStorageOptions['store'];
// @ts-ignore

// @ts-ignore
	constructor({ store = new Map() }: Partial<IMemoryStorageOptions> = {}) {
// @ts-ignore
		this.store = store;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	public async get(key: string): Promise<object | undefined> {
// @ts-ignore
		return this.store.get(key);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	public async set(key: string, value: object): Promise<boolean> {
// @ts-ignore
		this.store.set(key, value);
// @ts-ignore

// @ts-ignore
		return true;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	public async delete(key: string): Promise<boolean> {
// @ts-ignore
		return this.store.delete(key);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	// eslint-disable-next-line class-methods-use-this
// @ts-ignore
	public async touch(): Promise<void> {
// @ts-ignore
		// ...
// @ts-ignore
	}
// @ts-ignore
}
