import { inspect } from 'util';

import { Constructor } from '../types';
import { kSerializeData } from './constants';

type NodeInspectContext = typeof inspect.defaultOptions & {
	stylize(text: string, color: string): string;
};

export interface IInspectableContext<P> {
	stylize: (text: string, color: 'special' | 'string') => string;
	inspect: (payload: P, options?: { compact?: boolean }) => string;
}

type InspectableSerealize<T, P> = (instance: T) => P;
type InspectableStringify<T, P> = (
	instance: T,
	payload: P,
	context: IInspectableContext<P>
) => string;

export interface IInspectableOptions<T, P> {
	serealize?: InspectableSerealize<T, P>;
	stringify?: InspectableStringify<T, P>;
}

export const inspectable = <T, P = object>(
	klass: Constructor<T>,
	{
		serealize = (instance): P => (
			// @ts-ignore
			instance[kSerializeData]()
		),
		stringify = (instance, payload, context): string => {
			const stringified = context.inspect(payload);

			return `${context.stylize(klass.name, 'special')} ${stringified}`;
		}
	}: IInspectableOptions<T, P> = {}
): void => {
	Object.defineProperty(klass.prototype, inspect.custom, {
		value(depth: number, inspectContext: NodeInspectContext) {
			const context: IInspectableContext<P> = {
				stylize: inspectContext.stylize,
				inspect: (payload, options) => (
					inspect(payload, {
						...inspectContext,

						compact: options?.compact ?? false
					})
				)
			};

			const payload = serealize(this);

			return stringify(this, payload, context);
		}
	});
};
