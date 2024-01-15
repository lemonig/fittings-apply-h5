<template>
	<view class="content">
		<uni-list>
			<uni-list-item direction="row" clickable to @click="chooseAddress">
				<template v-slot:body>
					<view class="m-body">
						<view class="note">
							<uni-tag text="默认" type="error" v-if="address.isDefault" size="mini"></uni-tag>
							{{ address.provinceName }}{{ address.cityName }}{{ address.districtName }}
						</view>
						<view class="head">
							<text>{{ address.addressLine }}</text>
						</view>
						<view class="row">
							<view>{{ address.fullName }}</view>
							<view>{{ address.phoneNumber }}</view>
						</view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>

		<view class="form-wrap">
			<uni-forms :modelValue="formData" ref="formRef" id="formRef" labelWidth="80px" :rules="rules">
				<uni-forms-item label="发货方式" required name="shippingMethod">
					<uni-data-select v-model="formData.shippingMethod" :localdata="stype" placeholder="请选择"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="项目编号" required name="projectNumber">
					<uni-easyinput v-model="formData.projectNumber" placeholder="请输入" />
				</uni-forms-item>

				<uni-forms-item label="业务归属" required name="businessOwner">
					<uni-data-select v-model="formData.businessOwner" :localdata="btype" placeholder="请选择"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="运维地区" required name="maintenanceRegionCode">
					<uni-data-picker
						placeholder="请选择班级"
						popup-title="请选择所在地区"
						:localdata="regionTree"
						:map="{ text: 'label', value: 'key' }"
						v-model="formData.maintenanceRegionCode"
					></uni-data-picker>
				</uni-forms-item>

				<uni-forms-item label="站点" name="station">
					<uni-easyinput v-model="formData.station" placeholder="请输入" />
				</uni-forms-item>
				<uni-forms-item label="办事处" name="office">
					<uni-easyinput v-model="formData.office" placeholder="请输入" />
				</uni-forms-item>
				<uni-forms-item label="备注" name="notes">
					<uni-easyinput v-model="formData.notes" type="textarea" placeholder="请输入" />
				</uni-forms-item>
			</uni-forms>
		</view>
		<view style="margin-top: 15px">
			<uni-section title="已选配件" type="line">
				<uni-list>
					<uni-list-item direction="row" v-for="(item, index) in goods" :key="index">
						<template v-slot:header>
							<view class="m-left">
								<image class="u-img" :src="item.photoList[0]?.url" mode="aspectFit"></image>
							</view>
						</template>
						<template v-slot:body>
							<view class="m-body">
								<view class="head">{{ item.instrumentName }}</view>
								<view class="row">
									<view>{{ item.quantity }}</view>
									<view>{{ item.urgencyLevel.label }}</view>
									<view>{{ item.requisitionType.label }}</view>
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
		<button type="primary" @click="submit()" style="margin-top: 15px" :loading="loading">提交</button>
		<uni-popup ref="messageRef" type="message">
			<uni-popup-message :type="messageType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script setup>
import { addRequisitionRawDetails as addRequisitionRawDetailsApi, getDetail as getDetailApi, addRequisition as addRequisitionApi } from '@/api/index.js';
import { ref, onMounted, reactive } from 'vue';
import { regionListTree as regionListTreeApi, addressDefault as addressDefaultApi } from '@/api/public.js';
import { listRequisitionRawDetails as listRequisitionRawDetailsApi } from '@/api/index.js';
import { compressImage } from '@/common/util.js';
import { onLoad, onNavigationBarButtonTap, onShow } from '@dcloudio/uni-app';
import { objGet } from '../../uni_modules/uni-forms/components/uni-forms/utils';

const loading = ref(false);
const pageData = ref([]);
const formRef = ref();
const formData = reactive({
	shippingMethod: '',
	projectNumber: '',
	businessOwner: '',
	maintenanceRegionCode: '',
	station: '',
	office: '',
	notes: ''
});
const address = reactive({});
const regionTree = ref([]);
const goods = ref([]);
const rules = reactive({
	shippingMethod: {
		rules: [
			{
				required: true,
				errorMessage: '请选择'
			}
		]
	},
	projectNumber: {
		rules: [
			{
				required: true,
				errorMessage: '请输入'
			}
		]
	},
	businessOwner: {
		rules: [
			{
				required: true,
				errorMessage: '请选择'
			}
		]
	},
	maintenanceRegionCode: {
		rules: [
			{
				required: true,
				errorMessage: '请选择'
			}
		]
	}
});
const messageText = ref('');
const messageType = ref('success');
const messageRef = ref(null);
const stype = [
	{ value: '0', text: '邮寄' },
	{ value: '1', text: '自取' }
];
const btype = [
	{ value: '0', text: '运维部（水' },
	{ value: '1', text: '运维部（气' }
];

const fetch = async () => {
	loading.value = true;
	let res = await getDetailApi();
	if (res.success) {
		pageData.value = res.data;
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
		// 表单验证不通过，可以在这里进行一些处理，例如提示用户
		console.log('Form is not valid. Please check the form.');
	}
};

const addData = async (params) => {
	loading.value = true;
	let res = await addRequisitionApi(params);
	messageText.value = res.message;
	messageRef.value.open();
	if (res.success) {
		messageType.value = 'success';
		uni.redirectTo({
			url: '/pages/index/index'
		});
	} else {
		messageType.value = 'error';
	}
	loading.value = false;
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

const getDaddress = async () => {
	let res = await addressDefaultApi();
	if (res.success) {
		Object.assign(address, res.data);
	}
};
// 生命周期钩子
onMounted(() => {
	fetchRegin();
	fetchGoods();
	getDaddress();
});
onShow(() => {
	uni.$off('UpData');
	uni.$once('UpData', function (data) {
		Object.assign(address, data);
	});
});

onLoad((options) => {
	if (options.mid) {
		getDetail({
			id: options.mid
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
	padding-top: 5px;
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
</style>
