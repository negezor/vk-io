import VK from '../vk';
import ResourceResolver, { IResolvedResource } from './resource-resolver';

export default class Snippets {
	protected vk: VK;

	protected resourceResolver: ResourceResolver;

	/**
	 * Constructor
	 */
	public constructor(vk: VK) {
		this.vk = vk;

		this.resourceResolver = new ResourceResolver(this.vk);
	}

	/**
	 * Returns custom tag
	 */
	// eslint-disable-next-line class-methods-use-this
	public get [Symbol.toStringTag](): string {
		return 'Snippets';
	}

	/**
	 * Defines the type of object (user, community, application, attachment)
	 */
	public resolveResource(resource: string): Promise<IResolvedResource> {
		return this.resourceResolver.resolve(resource);
	}
}
