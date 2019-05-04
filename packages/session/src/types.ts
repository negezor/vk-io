import { Context } from 'vk-io';

export type Partial = {
	[key: string]: any;
};

export interface IContext extends Context {}

export interface ISessionContext extends Partial {
	$forceUpdate(): Promise<boolean>;
}
