type CacheRepositorySortingValues<Value> = (a: Value, b: Value) => number;

export default class CacheRepository<Key, Value> {
	private readonly collection: Map<Key, Value> = new Map();

	keys: Key[] = [];

	values: Value[] = [];

	sortingValues?: CacheRepositorySortingValues<Value>;

	constructor({ sortingValues }: { sortingValues?: CacheRepositorySortingValues<Value> } = {}) {
		this.sortingValues = sortingValues;
	}

	/**
	 * Checks has value by key
	 */
	has(key: Key): boolean {
		return this.collection.has(key);
	}

	/**
	 * Sets value by key
	 */
	set(key: Key, value: Value): void {
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
	get(key: Key): Value | null {
		return this.collection.get(key) || null;
	}

	/**
	 * Sets value by key else error if exits
	 */
	strictSet(key: Key, value: Value): void {
		if (this.collection.has(key)) {
			throw new Error(`Value by ${key} already exists`);
		}

		return this.set(key, value);
	}

	/**
	 * Returns value by key else error
	 */
	strictGet(key: Key): Value {
		const value = this.get(key);

		if (!value) {
			throw new Error(`Value by ${key} not found`);
		}

		return value;
	}

	/**
	 * Returns iterator
	 */
	[Symbol.iterator](): IterableIterator<[Key, Value]> {
		return this.collection[Symbol.iterator]();
	}
}
