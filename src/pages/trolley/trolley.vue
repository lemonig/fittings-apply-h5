<template>
	<view class="content">
		<view class="tool">
			<button class="mini-btn" type="primary" size="mini" @click="goMatter('')">选配件</button>
			<button class="mini-btn" type="warn" size="mini" @click="goDeal">下单</button>
		</view>
		<uni-list v-if="pageData.length">
			<uni-swipe-action>
				<uni-swipe-action-item v-for="(item, index) in pageData" :key="index" :right-options="options">
					<template v-slot:right>
						<view class="slot-button" @click="bindClick({ id: item.id })"><text class="slot-button-text">删除</text></view>
					</template>

					<uni-list-item direction="row" clickable to @click="goMatter(item.id)">
						<template v-slot:header>
							<view class="m-left">
								<image class="u-img" :src="item.photoList[0]?.url" mode="aspectFit"></image>
							</view>
						</template>
						<template v-slot:body>
							<view class="m-body">
								<view class="head">{{ item.materialName }}</view>
								<view class="row">
									<view>【数量x{{ item.quantity }}】</view>
									<view>【{{ item.urgencyLevel.label }}】</view>
									<view>【{{ item.requisitionType.label }}】</view>
								</view>
								<view class="note">
									{{ item.requisitionReason }}
								</view>
							</view>
						</template>
						<template v-slot:footer></template>
					</uni-list-item>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</uni-list>
		<template v-else>
			<sd-empty></sd-empty>
		</template>

		<uni-popup ref="messageRef" type="message">
			<uni-popup-message type="warning" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script setup>
import { listRequisitionRawDetails as listRequisitionRawDetailsApi, deleteRequisitionRawDetails as deleteApi } from '@/api/index.js';
import { ref, onMounted } from 'vue';
import SdEmpty from '@/components/sd-empty/sd-empty.vue';

const loading = ref(false);
const pageData = ref([]);
const options = ref([
	{
		text: '删除',
		style: {
			backgroundColor: '#dd524d'
		}
	}
]);
const messageText = ref('');
const messageRef = ref(null);

const fetch = async () => {
	loading.value = true;
	let res = await listRequisitionRawDetailsApi();
	if (res.success) {
		pageData.value = res.data;
	}
	loading.value = false;
};

const goMatter = (id) => {
	let url = id ? `/pages/matter/matter?mid=${id}` : `/pages/matter/matter`;
	uni.navigateTo({
		url: url
	});
};
const goDeal = () => {
	if (pageData.value.length === 0) {
		messageText.value = '请先选择配件';
		messageRef.value.open();
		return;
	}
	uni.navigateTo({
		url: `/pages/order-form/order-form`
	});
};

function onNavigationBarButtonTap(e) {
	uni.navigateTo({
		url: `/pages/stationList/stationList`
	});
}

const bindClick = (e) => {
	deleted(e);
};

const deleted = async (id) => {
	let res = await deleteApi(id);
	if (res.success) {
		messageText.value = res.message;
		messageRef.value.open();
		fetch();
	}
};

// 生命周期钩子
onMounted(() => {
	fetch();
});
</script>

<style lang="scss">
.content {
}
.tool {
	display: flex;
	justify-content: space-between;
	padding: 10px 0;
}

.text-area {
}
.m-left {
	display: flex;
	align-content: center;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap-reverse;
	width: 90px;
	height: 90px;
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
		font-weight: bold;
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

.slot-button {
	/* #ifndef APP-NVUE */
	display: flex;
	height: 100%;
	/* #endif */
	flex: 1;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 0 20px;
	background-color: #ff5a5f;
}

.slot-button-text {
	color: #ffffff;
	font-size: 14px;
}
.title {
}
</style>
