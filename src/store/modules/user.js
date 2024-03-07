//用户
let test = 'db844f47b4224df4a61f5523024c15b8'
const user = {
	namespaced: true,
	state: {
		token: '',
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