type CacheRepositorySortingValues<Value> = (a: Value, b: Value) => number;

export class CacheRepository<Key, Value> {
	private readonly collection: Map<Key, Value> = new Map();

	public keys: Key[] = [];

	public values: Value[] = [];

	protected sortingValues?: CacheRepositorySortingValues<Value>;

	public constructor({ sortingValues }: {
		sortingValues?: CacheRepositorySortingValues<Value>;
	} = {}) {
		this.sortingValues = sortingValues;
	}

	/**
	 * Checks has value by key
	 */
	public has(key: Key): boolean {
		return this.collection.has(key);
	}

	/**
	 * Sets value by key
	 */
	public set(key: Key, value: Value): void {
		this.collection.set(key, value);

		this.keys = [...this.collection.keys()];
		this.values = [...this.collection.values()];

		if (this.sortingValues) {
			this.values.sort(this.sortingValues);
		}
	}

	/**
	 * Returns value by key
	 */
	public get(key: Key): Value | undefined {
		return this.collection.get(key);
	}

	/**
	 * Sets value by key else error if exits
	 */
	public strictSet(key: Key, value: Value): void {
		if (this.collection.has(key)) {
			throw new Error(`Value by ${key} already exists`);
		}

		return this.set(key, value);
	}

	/**
	 * Returns value by key else error
	 */
	public strictGet(key: Key): Value {
		const value = this.get(key);

		if (!value) {
			throw new Error(`Value by ${key} not found`);
		}

		return value;
	}

	/**
	 * Returns iterator
	 */
	public [Symbol.iterator](): IterableIterator<[Key, Value]> {
		return this.collection[Symbol.iterator]();
	}
}
