<template>
	<view class="empty-contain">
		<image src="../../static/image/empty.svg" mode=""></image>
		<text>空空如也</text>
	</view>
</template>

<script>
export default {
	name: 'sd-empty',
	data() {
		return {};
	}
};
</script>

<style>
.empty-contain {
	display: flex;
	flex-direction: column;
	align-items: center;
}
text {
	color: #303133;
}
</style>
