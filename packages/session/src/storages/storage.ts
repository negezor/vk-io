export interface ISessionStorage {
	get(key: string): Promise<object | undefined>;

	set(key: string, value: object): Promise<boolean>;

	delete(key: string): Promise<boolean>;

	touch(key: string): Promise<void>;
}
