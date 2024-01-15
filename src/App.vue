<template>
	<view></view>
</template>

<script setup>
import { useStore } from 'vuex';
import { onLaunch } from '@dcloudio/uni-app';
const store = useStore();

onLaunch(() => {
	var token = getCookie('app-token');
	if (token) {
		console.log('Cookie值为：' + token);
		store.commit('user/SET_TOKEN', token);
	} else {
		console.log('未找到指定的Cookie');
	}
	console.log('App Launch');
});

const getCookie = (cookieName) => {
	var name = cookieName + '=';
	var decodedCookie = decodeURIComponent(document.cookie);
	var cookieArray = decodedCookie.split(';');

	for (var i = 0; i < cookieArray.length; i++) {
		var cookie = cookieArray[i].trim();
		if (cookie.indexOf(name) === 0) {
			return cookie.substring(name.length, cookie.length);
		}
	}

	return null;
};
</script>

<style lang="scss">
@import '@/uni_modules/uni-scss/index.scss';
// @import '@/static/fonts/iconfont-weapp-icon.css';
/* #ifndef APP-PLUS-NVUE */
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
// @import './common/uni.css';
// @import '@/static/customicons.css';
/* H5 兼容 pc 所需 */
/* #ifdef H5 */
@media screen and (min-width: 768px) {
	body {
		overflow-y: scroll;
	}
}

/* 顶栏通栏样式 */
/* .uni-top-window {
	    left: 0;
	    right: 0;
	} */

uni-page-body {
	min-height: 100% !important;
	padding-bottom: calc(var(--window-bottom) + 20px);
	// padding-bottom: env( safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
}

.uni-top-window uni-tabbar .uni-tabbar {
	// background-color: #fff !important;
}

.uni-app--showleftwindow .hideOnPc {
	display: none !important;
}

/* #endif */

/* 以下样式用于 hello uni-app 演示所需 */
page {
	// background-color: #efeff4;
	height: 100%;
	font-size: 28rpx;
	color: #303133;
	background-color: #f2f3f5;
	/* line-height: 1.8; */
}

.fix-pc-padding {
	padding: 0 50px;
}

.uni-header-logo {
	padding: 30rpx;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 10rpx;
}

.uni-header-image {
	width: 100px;
	height: 100px;
}

.uni-hello-text {
	color: #7a7e83;
}
.uni-page-head-btn {
	margin-right: 15px;
}

.uni-hello-addfile {
	text-align: center;
	line-height: 300rpx;
	background: #fff;
	padding: 50rpx;
	margin-top: 10px;
	font-size: 38rpx;
	color: #808080;
}

/* #endif*/
</style>
