<template>
	<view class="content">
		<view class="example">
			<uni-forms :modelValue="formData" ref="formRef" id="formRef" labelWidth="80px">
				<uni-forms-item label="收货人" name="fullName">
					<uni-easyinput v-model="formData.fullName" placeholder="请输入" />
				</uni-forms-item>
				<uni-forms-item label="手机号" name="phoneNumber">
					<uni-easyinput v-model="formData.phoneNumber" placeholder="请输入" />
				</uni-forms-item>

				<uni-forms-item label="所在地区" name="district">
					<uni-data-picker
						placeholder="请选择"
						popup-title="请选择所在地区"
						:localdata="regionTree"
						:map="{ text: 'label', value: 'key' }"
						v-model="formData.district"
					></uni-data-picker>
				</uni-forms-item>

				<uni-forms-item label="详细地址" name="addressLine">
					<uni-easyinput v-model="formData.addressLine" placeholder="请输入" />
				</uni-forms-item>
				<uni-forms-item label="地址类型" name="addressType">
					<uni-data-select v-model="formData.addressType" :localdata="atype" placeholder="请选择"></uni-data-select>
				</uni-forms-item>

				<uni-forms-item label="默认" name="isDefault">
					<switch :checked="isDefault" @change="defaultChange" />
				</uni-forms-item>
			</uni-forms>
			<button type="primary" @click="submit()" :loading="loading">提交</button>
		</view>
		<uni-popup ref="messageRef" type="message">
			<uni-popup-message :type="messageType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script setup>
import { addRequisitionRawDetails as addRequisitionRawDetailsApi, addRequisition as addRequisitionApi } from '@/api/index.js';
import { ref, onMounted, reactive } from 'vue';
import { regionListTree as regionListTreeApi } from '@/api/public.js';
import { addAddress as addAddressApi, updateAddress as updateAddressApi, getAddress as getDetailApi } from '@/api/address.js';
import { compressImage } from '@/common/util.js';
import { onLoad, onNavigationBarButtonTap } from '@dcloudio/uni-app';

const loading = ref(false);
const formRef = ref();
const formData = reactive({
	fullName: '',
	addressType: '',
	addressLine: '',
	district: '',
	city: '',
	province: '',
	phoneNumber: '',
	addressType: ''
});
const messageText = ref('');
const messageType = ref('success');
const messageRef = ref(null);
const isDefault = ref(false);
const regionTree = ref([]);

const atype = [
	{ value: '0', text: '寄件地址' },
	{ value: '1', text: ' 收货地址' }
];
const btype = [
	{ value: '0', text: '运维部（水)' },
	{ value: '1', text: '运维部（气)' }
];
const aid = ref(null);

const defaultChange = function (e) {
	isDefault.value = e.detail.value;
};

const fetchRegin = async () => {
	let res = await regionListTreeApi();
	if (res.success) {
		regionTree.value = res.data;
	}
};

const submit = async () => {
	if (!formRef.value) return;

	const valid = await formRef.value.validate();
	let params = JSON.parse(JSON.stringify(formData));
	params.isDefault = isDefault.value;
	if (valid) {
		if (aid.value) {
			params.id = aid.value;
			updateData(params);
		} else {
			addData(params);
		}
	} else {
		console.log('Form is not valid. Please check the form.');
	}
};

const addData = async (params) => {
	loading.value = true;
	let res = await addAddressApi(params);
	messageText.value = res.message;
	messageRef.value.open();
	loading.value = false;
	if (res.success) {
		uni.navigateBack();
	} else {
		messageType.value = 'error';
	}
};
const updateData = async (params) => {
	loading.value = true;
	let res = await updateAddressApi(params);
	messageText.value = res.message;
	messageRef.value.open();
	loading.value = false;
	if (res.success) {
		uni.navigateBack();
	} else {
		messageType.value = 'error';
	}
};

const getDetail = async (params) => {
	let res = await getDetailApi(params);
	Object.assign(formData, res.data);
	isDefault.value = res.data.isDefault;
};

// 生命周期钩子
onMounted(() => {
	fetchRegin();
});

onLoad((options) => {
	if (options.aid) {
		aid.value = options.aid;
		getDetail({
			id: options.aid
		});
	}
});
</script>

<style>
.content {
	padding: 10px;
	background-color: #fff;
}

.text-area {
}

.title {
}
</style>
