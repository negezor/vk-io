import { createHash } from 'crypto';

const openAPIProperties = [
	'expire',
	'secret',
	'mid',
	'sid'
];

export interface IUserAuthorizedThroughOpenAPIOptions {
	clientSecret: string;
	params: Record<'expire' | 'mid' | 'secret' | 'sid' | 'sig', string>
}

export const userAuthorizedThroughOpenAPI = async ({
	clientSecret,
	params
}: IUserAuthorizedThroughOpenAPIOptions):Promise<{ authorized: boolean }> => {
	let sign = ([...openAPIProperties] as (keyof typeof params)[])
		.sort()
		.map(key => `${key}=${params[key]}`)
		.join('');

	sign += clientSecret;
	sign = createHash('md5')
		.update(sign)
		.digest('hex');

	const expire = Number(params.expire);

	const isExpired = Number.isNaN(expire) || expire < (Date.now() / 1000);
	const authorized = params.sig === sign && !isExpired;

	return { authorized };
};
