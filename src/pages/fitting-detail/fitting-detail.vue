<template>
	<view class="content">
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500">
				<swiper-item v-for="item in pageData.photoList" :key="item.id" style="text-align: center">
					<image style="height: 200px" class="u-img" :src="item.url" mode="heightFix"></image>
				</swiper-item>
			</swiper>
			<view class="card">
				<view class="head">{{ pageData.inventoryName }}</view>
				<view class="desc">编码：{{ pageData.inventoryCode }}</view>
				<view class="desc">单位：{{ pageData.unitOfMeasure }}</view>
				<view class="desc">规格：{{ pageData.specification }}</view>
				<view class="desc">型号：{{ pageData.modelNumber }}</view>

				<view class="tag-view">
					<uni-tag v-for="(item, index) in pageData.labelList" :key="index" style="margin: 0 8rpx" :inverted="true" :text="item" type="warning" size="mini" />
				</view>
			</view>
		</view>
		<view style="margin-top: 15px; background-color: #fff; padding: 8rpx 0">
			<view style="font-size: 36rpx; font-weight: bold; padding: 20rpx 0 40rpx 36rpx">适配仪器</view>
			<view v-for="(item, index) in pageData?.adapterInstrumentAccessoryList" :key="item.id" style="margin-bottom: 36rpx">
				<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500">
					<swiper-item v-for="item in item.photoList" :key="item.id" style="text-align: center">
						<image style="height: 200px" class="u-img" :src="item.url" mode="heightFix"></image>
					</swiper-item>
				</swiper>
				<view class="card" style="border-bottom: 1px solid #eee">
					<view class="desc">仪器名称：{{ item.inventoryName }}</view>
					<view class="desc">仪器型号：{{ item.modelNumber }}</view>
					<view class="desc">系列名称：{{ item.specification }}</view>
					<view class="desc">备注：{{ item.note }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { accessoryDetail as accessoryDetailApi } from '@/api/public.js';
import { ref, onMounted, reactive } from 'vue';
import { onLoad, onNavigationBarButtonTap, onShow } from '@dcloudio/uni-app';

const loading = ref(false);
const pageData = reactive({});

const address = reactive({});
const regionTree = ref([]);
const goods = ref([]);

const fetch = async (params) => {
	loading.value = true;
	let res = await accessoryDetailApi(params);
	if (res.success) {
		Object.assign(pageData, res.data);
	}
	loading.value = false;
};

onLoad((options) => {
	if (options.fid) {
		fetch({
			id: options.fid
		});
	}
});
</script>

<style lang="scss">
.content {
}

.text-area {
}

.title {
}
.form-wrap {
	margin-top: 20px;
	padding: 10px;
	background-color: #fff;
}

.m-left {
	display: flex;
	align-content: center;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap-reverse;
	width: 45px;
	height: 45px;
	border-radius: 5px;
	border-color: #eee;
	border-width: 1px;
	border-style: solid;
	overflow: hidden;
	.u-img {
		width: 100%;
		height: 100%;
	}
}
.m-body {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: flex-start;
	padding-left: 10px;
	overflow: hidden;
	flex: 1;

	.row {
		display: flex;

		view {
			margin-right: 8px;
		}
	}
	.note {
		color: #999;
		font-size: 10px;
		font-weight: 400;
	}
}

.uni-margin-wrap {
	width: 100vw;
	width: 100%;
}
.card {
	background-color: #fff;
	padding: 40rpx 36rpx;
	.head {
		font-size: 16px;
		color: #303133;
		font-weight: bold;
		overflow: hidden;
		padding: 4px 0;
	}
	.desc {
		color: #606266;
		font-size: 12px;
		font-weight: 400;
		padding: 4rpx;
	}
	.tag-view {
		padding-top: 18rpx;
	}
}

.card-one {
}
.swiper {
	height: 300rpx;
}
.swiper-item {
	display: block;
	height: 300rpx;
	line-height: 300rpx;
	text-align: center;
}
.swiper-list {
	margin-top: 40rpx;
	margin-bottom: 0;
}
.uni-common-mt {
	margin-top: 60rpx;
	position: relative;
}
.info {
	position: absolute;
	right: 20rpx;
}
</style>
