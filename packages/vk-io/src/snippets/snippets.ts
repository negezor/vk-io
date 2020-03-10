import { VK } from '../vk';
import { inspectable } from '../utils/inspectable';
import { ResourceResolver, IResolvedResource } from './resource-resolver';

export class Snippets {
	private vk: VK;

	private resourceResolver: ResourceResolver;

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
	public get [Symbol.toStringTag](): string {
		return this.constructor.name;
	}

	/**
	 * Defines the type of object (user, community, application, attachment)
	 */
	public resolveResource(resource: string | number): Promise<IResolvedResource> {
		return this.resourceResolver.resolve(resource);
	}
}

inspectable(Snippets, {
	serialize: () => ({})
});
