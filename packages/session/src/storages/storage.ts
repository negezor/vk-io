import { Partial } from '../types';

export default interface ISessionStorage {
	has(key: string): Promise<boolean>;

	get(key: string): Promise<Partial | null>;

	set(key: string, value: Partial): Promise<boolean>;

	delete(key: string): Promise<boolean>;
}
