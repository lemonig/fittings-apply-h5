<template>
	<view class="card-contain">
		<view class="head">
			<view class="head-l">
				<uni-icons type="home-filled" size="30"></uni-icons>
				<text>上塘水质</text>
			</view>
			<view class="head-r">
				<uni-tag text="合格" type="success"></uni-tag>
			</view>
			<slot name="body"></slot>
			<slot name="footer"></slot>
		</view>
	</view>
</template>

<script>
export default {
	name: 'sd-list',
	data() {
		return {};
	}
};
</script>

<style lang="scss">
.card-contain {
	.head {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
}
</style>
