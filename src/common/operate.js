import store from '../store/index.js';
export default {
	//接口
	api: "https://www.greandata.com:10016/",
	isToken,
}


function isToken() {

	if (!store.state.user.token) {
		uni.redirectTo({
			url: `/pages/401/401`
		});
		return
	}
	return store.state.user.token
}