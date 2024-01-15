//用户

const user = {
	namespaced: true,
	state: {
		token: "",
	},
	mutations: {
		SET_TOKEN(state, provider) {
			state.token = provider
		},

	},
	getters: {

	},
	actions: {

	}
}
export default user