<template>
	<view>
		<uni-section v-if="pageData.length" v-for="(item, index) in pageData" :key="index" :title="`发货日期: ${item.shipmentTime}`" style="margin-bottom: 20px">
			<uni-list v-if="item?.detailVoList" v-for="(jtem, jndex) in item.detailVoList" :key="jndex">
				<template v-slot:right></template>

				<uni-list-item direction="row" clickable to @click="goMatter(jtem.id)">
					<template v-slot:header>
						<view class="m-left">
							<image class="u-img" :src="jtem.photoList[0]?.url" mode="aspectFit"></image>
						</view>
					</template>
					<template v-slot:body>
						<view class="m-body">
							<view class="head">{{ jtem.inventoryName }}</view>
							<view class="row">
								<view>数量 x {{ jtem.quantity }}</view>
								<view>【{{ jtem.urgencyLevel.label }}】</view>
								<view>【{{ jtem.requisitionType.label }}】</view>
							</view>
							<view class="note">
								{{ jtem.requisitionReason }}
							</view>
						</view>
					</template>
					<template v-slot:footer>
						<view class="">
							<uni-tag :text="jtem.verificationCategory.label"></uni-tag>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
			<view class="footer" @click="goLogistics(item.id)">
				<button type="default" size="mini">查看物流</button>
			</view>
		</uni-section>

		<template v-else>
			<sd-empty></sd-empty>
		</template>
	</view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref, onMounted, reactive } from 'vue';
import { deliveryList as deliveryListApi } from '@/api/logistics.js';
import SdEmpty from '@/components/sd-empty/sd-empty.vue';

const pageData = ref([]);
const id = ref('');

const fetch = async (params) => {
	let { data, success } = await deliveryListApi(params);
	if (success) {
		pageData.value = data;
	}
};

const goLogistics = (id) => {};

onLoad((options) => {
	if (options.id) {
		id.value = options.id;
		fetch({
			id: options.id
		});
	}
});
</script>

<style lang="scss">
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
	.head {
		font-size: 16px;
		color: #3b4144;
		font-weight: 400;
		overflow: hidden;
	}
	.row {
		display: flex;
		color: #999;
		font-size: 12px;
		font-weight: 400;
		view {
			margin-right: 8px;
		}
	}
	.note {
		color: #999;
		font-size: 12px;
		font-weight: 400;
	}
}
.footer {
	padding: 8px;
	text-align: end;
}
</style>
