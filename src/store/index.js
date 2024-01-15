import {
	createStore
} from 'vuex'
//登录
import user from "./modules/user.js"
const store = createStore({
	modules: {
		user
	}
});

export default store