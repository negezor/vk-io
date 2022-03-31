// @ts-ignore
export interface ISessionStorage {
// @ts-ignore
	get(key: string): Promise<object | undefined>;
// @ts-ignore

// @ts-ignore
	set(key: string, value: object): Promise<boolean>;
// @ts-ignore

// @ts-ignore
	delete(key: string): Promise<boolean>;
// @ts-ignore

// @ts-ignore
	touch(key: string): Promise<void>;
// @ts-ignore
}
