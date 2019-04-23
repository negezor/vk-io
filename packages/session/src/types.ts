export type Partial = {
	[key: string]: any;
};

export interface IContext extends Partial {}

export interface ISessionContext extends Partial {
	$forceUpdate(): Promise<boolean>;
}
