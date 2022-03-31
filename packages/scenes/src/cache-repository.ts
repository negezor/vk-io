// @ts-ignore
type CacheRepositorySortingValues<Value> = (a: Value, b: Value) => number;
// @ts-ignore

// @ts-ignore
export class CacheRepository<Key, Value> {
// @ts-ignore
	private readonly collection: Map<Key, Value> = new Map();
// @ts-ignore

// @ts-ignore
	public keys: Key[] = [];
// @ts-ignore

// @ts-ignore
	public values: Value[] = [];
// @ts-ignore

// @ts-ignore
	protected sortingValues?: CacheRepositorySortingValues<Value>;
// @ts-ignore

// @ts-ignore
	public constructor({ sortingValues }: {
// @ts-ignore
		sortingValues?: CacheRepositorySortingValues<Value>;
// @ts-ignore
	} = {}) {
// @ts-ignore
		this.sortingValues = sortingValues;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks has value by key
// @ts-ignore
	 */
// @ts-ignore
	public has(key: Key): boolean {
// @ts-ignore
		return this.collection.has(key);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Sets value by key
// @ts-ignore
	 */
// @ts-ignore
	public set(key: Key, value: Value): void {
// @ts-ignore
		this.collection.set(key, value);
// @ts-ignore

// @ts-ignore
		this.keys = [...this.collection.keys()];
// @ts-ignore
		this.values = [...this.collection.values()];
// @ts-ignore

// @ts-ignore
		if (this.sortingValues) {
// @ts-ignore
			this.values.sort(this.sortingValues);
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns value by key
// @ts-ignore
	 */
// @ts-ignore
	public get(key: Key): Value | undefined {
// @ts-ignore
		return this.collection.get(key);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Sets value by key else error if exits
// @ts-ignore
	 */
// @ts-ignore
	public strictSet(key: Key, value: Value): void {
// @ts-ignore
		if (this.collection.has(key)) {
// @ts-ignore
			throw new Error(`Value by ${key} already exists`);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.set(key, value);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns value by key else error
// @ts-ignore
	 */
// @ts-ignore
	public strictGet(key: Key): Value {
// @ts-ignore
		const value = this.get(key);
// @ts-ignore

// @ts-ignore
		if (!value) {
// @ts-ignore
			throw new Error(`Value by ${key} not found`);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return value;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns iterator
// @ts-ignore
	 */
// @ts-ignore
	public [Symbol.iterator](): IterableIterator<[Key, Value]> {
// @ts-ignore
		return this.collection[Symbol.iterator]();
// @ts-ignore
	}
// @ts-ignore
}
