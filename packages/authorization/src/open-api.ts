// @ts-ignore
import { createHash } from 'crypto';
// @ts-ignore

// @ts-ignore
const openAPIProperties = [
// @ts-ignore
	'expire',
// @ts-ignore
	'secret',
// @ts-ignore
	'mid',
// @ts-ignore
	'sid'
// @ts-ignore
];
// @ts-ignore

// @ts-ignore
export interface IUserAuthorizedThroughOpenAPIOptions {
// @ts-ignore
	clientSecret: string;
// @ts-ignore
	params: Record<'expire' | 'mid' | 'secret' | 'sid' | 'sig', string>
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export const userAuthorizedThroughOpenAPI = async ({
// @ts-ignore
	clientSecret,
// @ts-ignore
	params
// @ts-ignore
}: IUserAuthorizedThroughOpenAPIOptions):Promise<{ authorized: boolean }> => {
// @ts-ignore
	let sign = ([...openAPIProperties] as (keyof typeof params)[])
// @ts-ignore
		.sort()
// @ts-ignore
		.map(key => `${key}=${params[key]}`)
// @ts-ignore
		.join('');
// @ts-ignore

// @ts-ignore
	sign += clientSecret;
// @ts-ignore
	sign = createHash('md5')
// @ts-ignore
		.update(sign)
// @ts-ignore
		.digest('hex');
// @ts-ignore

// @ts-ignore
	const expire = Number(params.expire);
// @ts-ignore

// @ts-ignore
	const isExpired = Number.isNaN(expire) || expire < (Date.now() / 1000);
// @ts-ignore
	const authorized = params.sig === sign && !isExpired;
// @ts-ignore

// @ts-ignore
	return { authorized };
// @ts-ignore
};
