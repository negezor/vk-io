import ImplicitFlowUser from './implicit-flow-user';

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
	implicitFlowUser() {
		return new ImplicitFlowUser(this.vk);
	}

	/* TODO: Make me */
}
