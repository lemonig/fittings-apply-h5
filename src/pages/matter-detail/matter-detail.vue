<template>
	<view class="content">
		<uni-list>
			<uni-list-item title="已发货" clickable @click="goShipper(pageData.id)">
				<template v-slot:footer>
					<text style="color: #0f40f5; font-size: 14px; font-weight: bold">{{ pageData.deliveryNum }} 笔</text>
				</template>
			</uni-list-item>
			<uni-list-item title="申请时间" :rightText="pageData.applicationTime"></uni-list-item>
			<uni-list-item title="审批状态" :rightText="pageData.approvalStatus?.label"></uni-list-item>
		</uni-list>

		<uni-list style="margin-top: 15px">
			<uni-list-item :title="pageData.shippingFullname + '  ' + pageData.shippingPhoneNumber" :note="pageData.shippingFormatAddress"></uni-list-item>
		</uni-list>

		<uni-list style="margin-top: 15px">
			<uni-list-item title="发货方式" :rightText="pageData.shippingMethod?.label"></uni-list-item>
			<uni-list-item title="项目编号" :rightText="pageData.projectNumber"></uni-list-item>
			<uni-list-item title="业务归属" :rightText="pageData.businessOwner?.label"></uni-list-item>
			<uni-list-item title="运维地区" :rightText="pageData.maintenanceRegion"></uni-list-item>
			<uni-list-item title="站点" :rightText="pageData.station"></uni-list-item>
			<uni-list-item title="办事处" :rightText="pageData.office"></uni-list-item>
			<uni-list-item title="备注" :rightText="pageData.notes"></uni-list-item>
		</uni-list>

		<view style="margin-top: 15px">
			<uni-section title="申请配件" type="line">
				<uni-list>
					<uni-list-item direction="row" v-for="(item, index) in pageData.rawDetailsVoList" :key="index">
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
				</uni-list>
			</uni-section>
		</view>
	</view>
</template>

<script setup>
import { addRequisitionRawDetails as addRequisitionRawDetailsApi, getDetail as getDetailApi, addRequisition as addRequisitionApi } from '@/api/index.js';
import { ref, onMounted, reactive } from 'vue';
import { regionListTree as regionListTreeApi } from '@/api/public.js';
import { listRequisitionRawDetails as listRequisitionRawDetailsApi, requisitionGet as requisitionGetApi } from '@/api/index.js';
import { compressImage } from '@/common/util.js';
import { onLoad, onNavigationBarButtonTap, onShow } from '@dcloudio/uni-app';
import { objGet } from '../../uni_modules/uni-forms/components/uni-forms/utils';

const loading = ref(false);
const pageData = reactive({});

const address = reactive({});
const regionTree = ref([]);
const goods = ref([]);

const fetch = async (params) => {
	loading.value = true;
	let res = await requisitionGetApi(params);
	if (res.success) {
		Object.assign(pageData, res.data);
	}
	loading.value = false;
};
const fetchRegin = async () => {
	let res = await regionListTreeApi();
	if (res.success) {
		regionTree.value = res.data;
	}
};

const fetchGoods = async () => {
	let res = await listRequisitionRawDetailsApi();
	if (res.success) {
		goods.value = res.data;
	}
};

const submit = async () => {
	if (!formRef.value) return;

	const valid = await formRef.value.validate();
	let params = JSON.parse(JSON.stringify(formData));
	params.addressId = address.id;
	params.rawDetailsList = goods.value;
	if (valid) {
		addData(params);
	} else {
		console.log('Form is not valid. Please check the form.');
	}
};

const addData = async (params) => {
	let res = await addRequisitionApi(params);
};

const getDetail = async (params) => {
	let res = await getDetailApi(params);
	Object.assign(formData, res.data);
};

const chooseAddress = () => {
	uni.navigateTo({
		url: `/pages/address/address`
	});
};

const goShipper = (id) => {
	uni.navigateTo({
		url: `/pages/shippers/shippers?id=${id}`
	});
};

// 生命周期钩子
onMounted(() => {
	fetchRegin();
	fetchGoods();
});
onShow(() => {
	uni.$off('UpData'); //建议先销毁一次监听，再进行新的一次监听，否则会出现重复监听的现象
	uni.$once('UpData', function (data) {
		Object.assign(address, data);
		//这的data就是B页面传递过来的数据
	});
});

onLoad((options) => {
	if (options.id) {
		fetch({
			id: options.id
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
		color: #303133;
		font-weight: 400;
		overflow: hidden;
		padding: 4px 0;
	}
	.row {
		display: flex;
		color: #606266;
		font-size: 12px;
		font-weight: 400;
	}
	.note {
		color: #999;
		font-size: 10px;
		font-weight: 400;
	}
}
</style>
