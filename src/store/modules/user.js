//用户

const user = {
	namespaced: true,
	state: {
		token: "327b152e02b94d67af3d330a753001cb",
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