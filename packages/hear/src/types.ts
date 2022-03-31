// @ts-ignore
export type AllowArray<T> = T | T[];
// @ts-ignore

// @ts-ignore
export type HearFunctionCondition<T, V> = (value: V, context: T) => boolean;
// @ts-ignore

// @ts-ignore
export type HearCondition<T, V> = HearFunctionCondition<T, V> | RegExp | string | number | boolean;
// @ts-ignore

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
export type HearObjectCondition<T extends Record<string, any>> =
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
Record<string, AllowArray<HearCondition<T, any>>>
// @ts-ignore
& {
// @ts-ignore
	[P in keyof T]?: AllowArray<HearCondition<T, T[P]>>;
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
export type HearConditions<T> = (
// @ts-ignore
	AllowArray<HearCondition<T, string | undefined>>
// @ts-ignore
	| AllowArray<HearObjectCondition<T>>
// @ts-ignore
);
