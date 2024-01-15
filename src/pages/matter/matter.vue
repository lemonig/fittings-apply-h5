<template>
	<view class="content">
		<view class="example">
			<!-- 基础用法，不包含校验规则 -->
			<uni-forms :modelValue="formData" ref="formRef" id="formRef" labelWidth="80px" :rules="rules">
				<uni-forms-item label="物料编码" required name="inventoryCode">
					<view class="sd-select" @click="gotoFitting">
						<view class="sd-select__input-box">
							<view v-if="!!formData.inventoryCode" class="sd-select__input-text">{{ formData.inventoryCode }}</view>
							<view v-else class="sd-select__input-text sd-select__input-placeholder">请选择</view>
							<uni-icons type="bottom" size="14" style="color: rgb(153, 153, 153)"></uni-icons>
						</view>
					</view>
				</uni-forms-item>
				<uni-forms-item label="物料名称" required name="materialName">
					<uni-easyinput v-model="formData.materialName" placeholder="请输入" />
				</uni-forms-item>
				<uni-forms-item label="单位" name="unitOfMeasure">
					<uni-easyinput v-model="formData.unitOfMeasure" placeholder="请输入" />
				</uni-forms-item>
				<uni-forms-item label="类型" required name="materialType">
					<uni-data-select v-model="formData.materialType" :localdata="mtype" placeholder="请选择"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="仪器名称" name="instrumentName">
					<uni-easyinput v-model="formData.instrumentName" placeholder="请输入" />
				</uni-forms-item>
				<uni-forms-item label="品牌型号" name="instrumentBrandModel">
					<uni-easyinput v-model="formData.instrumentBrandModel" placeholder="请输入" />
				</uni-forms-item>
				<uni-forms-item label="数量" required name="quantity">
					<uni-number-box v-model="formData.quantity" />
				</uni-forms-item>
				<uni-forms-item label="紧急程度" required name="name">
					<uni-data-select v-model="formData.urgencyLevel" :localdata="utype" placeholder="请选择"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="使用类型" required name="requisitionType">
					<uni-data-select v-model="formData.requisitionType" :localdata="rtype" placeholder="请选择"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="领用原因" required name="requisitionReason">
					<uni-easyinput v-model="formData.requisitionReason" type="textarea" placeholder="请输入" />
				</uni-forms-item>

				<uni-forms-item label="照片" required name="photoList">
					<uni-file-picker :limit="1" file-mediatype="image" mode="grid" v-model="formData.photoList" :sizeType="['compressed']" @select="onUploadSuccess"></uni-file-picker>
				</uni-forms-item>
			</uni-forms>
			<button type="primary" @click="submit()" :loading="loading">提交</button>
		</view>

		<uni-popup ref="messageRef" type="message">
			<uni-popup-message type="success" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script setup>
import { addRequisitionRawDetails as addApi, getDetail as getDetailApi, updateRequisitionRawDetails as updateApi } from '@/api/index.js';
import { ref, onMounted, reactive } from 'vue';
import { uploadImg } from '@/api/public.js';
import { compressImage } from '@/common/util.js';
import { onLoad, onNavigationBarButtonTap, onShow } from '@dcloudio/uni-app';

const loading = ref(false);
const pageData = ref([]);
const formRef = ref();
const formData = reactive({
	inventoryCode: '',
	materialName: '',
	unitOfMeasure: '',
	materialType: '',
	instrumentName: '',
	instrumentBrandModel: '',
	quantity: 0,
	urgencyLevel: '',
	requisitionType: '',
	requisitionReason: '',
	photoList: [],
	userId: 0
});
const mid = ref(null);
const messageText = ref('');
const messageRef = ref(null);

const rules = reactive({
	materialName: {
		rules: [
			{
				required: true,
				errorMessage: '请输入'
			}
		]
	},
	materialType: {
		rules: [
			{
				required: true,
				errorMessage: '请选择'
			}
		]
	},
	urgencyLevel: {
		rules: [
			{
				required: true,
				errorMessage: '请选择'
			}
		]
	},
	requisitionType: {
		rules: [
			{
				required: true,
				errorMessage: '请选择'
			}
		]
	},
	requisitionReason: {
		rules: [
			{
				required: true,
				errorMessage: '请输入'
			}
		]
	},
	photoList: {
		rules: [
			{
				required: true,
				errorMessage: '请选择'
			}
		]
	}
});
const mtype = [
	{ value: '0', text: '配件' },
	{ value: '1', text: '耗材' }
];

const utype = [
	{ value: '0', text: '紧急' },
	{ value: '1', text: '一般' },
	{ value: '2', text: '不紧急' }
];

const rtype = [
	{ value: '0', text: '备用' },
	{ value: '1', text: '即时更好' }
];
const fetch = async () => {
	loading.value = true;
	let res = await getDetailApi();
	if (res.success) {
		pageData.value = res.data;
	}
	loading.value = false;
};

const onUploadSuccess = (res) => {
	uploadToServer(res.tempFiles[0].file);
};
const uploadToServer = async (file) => {
	let filec = await compressImage(file);
	let res = await uploadImg(filec);
	let resobj = JSON.parse(res);
	formData.photoList = [
		{
			filename: resobj.data.filename,
			url: resobj.data.url,
			id: resobj.data.id,
			originalFilename: resobj.data.originalFilename
		}
	];
};
const submit = async () => {
	if (!formRef.value) return;

	const valid = await formRef.value.validate();
	let params = JSON.parse(JSON.stringify(formData));
	if (valid) {
		if (mid.value) {
			params.id = mid.value;
			modifyData(params);
		} else {
			addData(params);
		}
	} else {
		console.log('Form is not valid. Please check the form.');
	}
};

const addData = async (params) => {
	loading.value = true;
	let res = await addApi(params);
	messageText.value = res.message;
	messageRef.value.open();
	loading.value = false;
	uni.redirectTo({
		url: '/pages/trolley/trolley'
	});
};
const modifyData = async (params) => {
	loading.value = true;
	let res = await updateApi(params);
	messageText.value = res.message;
	messageRef.value.open();
	loading.value = false;
	uni.redirectTo({
		url: '/pages/trolley/trolley'
	});
};
const getDetail = async (params) => {
	let res = await getDetailApi(params);
	Object.assign(formData, res.data);
	// formData.value = res.data;
};

const gotoFitting = () => {
	uni.navigateTo({
		url: `/pages/fitting/fitting`
	});
};

onShow(() => {
	uni.$off('UpData');
	uni.$once('UpData', function (data) {
		formData.inventoryCode = data;
	});
});

onLoad((options) => {
	if (options.mid) {
		mid.value = options.mid;
		getDetail({
			id: options.mid
		});
	}
});
</script>

<style lang="scss">
.content {
	padding: 10px;
	background-color: #fff;
}

.text-area {
}

.title {
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

.sd-select {
	font-size: 14px;
	border: 1px solid #e5e5e5;
	box-sizing: border-box;
	border-radius: 4px;
	padding: 0 5px;
	padding-left: 10px;
	position: relative;
	display: flex;
	-webkit-user-select: none;
	user-select: none;
	flex-direction: row;
	align-items: center;
	border-bottom: solid 1px #e5e5e5;
	width: 100%;
	flex: 1;
	height: 35px;
}

.sd-select__input-box {
	height: 35px;
	position: relative;
	display: flex;
	flex: 1;
	flex-direction: row;
	align-items: center;
}

.sd-select__input-text {
	width: 90%;
	color: #333;
	white-space: nowrap;
	text-overflow: ellipsis;
	-o-text-overflow: ellipsis;
	overflow: hidden;
}

.sd-select__input-placeholder {
	color: #6a6a6a;
	font-size: 12px;
}
</style>
