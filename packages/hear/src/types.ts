export type AllowArray<T> = T | T[];

export type HearFunctionCondition<T, V> = (value: V, context: T) => boolean;

export type HearCondition<T, V> = HearFunctionCondition<T, V> | RegExp | string | number | boolean;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HearObjectCondition<T extends Record<string, any>> =
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Record<string, AllowArray<HearCondition<T, any>>>
& {
	[P in keyof T]?: AllowArray<HearCondition<T, T[P]>>;
};

export type HearConditions<T> = (
	AllowArray<HearCondition<T, string | undefined>>
	| AllowArray<HearObjectCondition<T>>
);
