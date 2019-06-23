export default interface ISessionStorage {
	has(key: string): Promise<boolean>;

	get(key: string): Promise<object | null>;

	set(key: string, value: object): Promise<boolean>;

	delete(key: string): Promise<boolean>;
}
