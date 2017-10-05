import ImplicitFlowUser from './implicit-flow-user';
import ImplicitFlowGroups from './implicit-flow-groups';

export default class Auth {
	/**
	 * Constructor
	 *
	 * @param {VK} vk
	 */
	constructor(vk) {
		this.vk = vk;
	}

	/**
	 * Standalone auth with login & pass
	 *
	 * @return {ImplicitFlowUser}
	 */
	implicitFlowUser(options = {}) {
		return new ImplicitFlowUser(this.vk, options);
	}

	/**
	 * Standalone auth with login & pass for group
	 *
	 * @param {mixed}  groups
	 * @param {Object} options
	 *
	 * @return {ImplicitFlowGroup}
	 */
	implicitFlowGroups(groups, options = {}) {
		return new ImplicitFlowGroups(this.vk, { ...options, groups });
	}

	/* TODO: Make me */
}
