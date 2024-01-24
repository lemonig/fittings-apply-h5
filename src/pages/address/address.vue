<template>
	<view class="content">
		<uni-list v-if="pageData.length">
			<uni-list-item v-for="(item, index) in pageData" :key="index" direction="row" clickable @click="selected(item)">
				<template v-slot:header>
					<view class="m-left" v-if="item.selected">
						<uni-icons type="checkbox-filled" size="18" color="#f56c6c"></uni-icons>
					</view>
				</template>
				<template v-slot:body>
					<view class="m-body">
						<view class="note">{{ item.provinceName }}{{ item.cityName }}{{ item.districtName }}</view>
						<view class="head">
							<text>{{ item.addressLine }}</text>
						</view>
						<view class="row">
							<view>{{ item.fullName }}</view>
							<view>{{ item.phoneNumber }}</view>
							<uni-tag text="默认" type="error" :circle="true" v-if="item.isDefault" size="small"></uni-tag>
						</view>
					</view>
				</template>
				<template v-slot:footer>
					<view class="btn-contain" @click="($event) => goAddressForm(item.id, $event)">
						<uni-icons type="compose" size="20"></uni-icons>
					</view>
				</template>
			</uni-list-item>
		</uni-list>

		<button style="margin-top: 20px" type="primary" @click="($event) => goAddressForm('', $event)">新建收货地址</button>
	</view>
</template>
<script setup>
import { addresspage as addresspageApi, deleteAddress } from '@/api/address.js';
import { ref, onMounted, reactive } from 'vue';
import { regionListTree as regionListTreeApi } from '@/api/public.js';
import { compressImage } from '@/common/util.js';
import { onLoad, onNavigationBarButtonTap, onShow } from '@dcloudio/uni-app';

const loading = ref(false);
const pageData = ref([]);

const fetch = async () => {
	loading.value = true;
	let res = await addresspageApi();
	if (res.success) {
		pageData.value = res.data;
	}
	loading.value = false;
};

const selected = (sele) => {
	pageData.value.map((item) => {
		if (item.id === sele.id) {
			item.selected = true;
		} else {
			item.selected = false;
		}
	});
	uni.$emit('UpData', sele);
	uni.navigateBack({
		delta: 1
	});
};

const goAddressForm = (id, event) => {
	event.stopPropagation();
	let url = id ? `/pages/address-form/address-form?aid=${id}` : `/pages/address-form/address-form`;
	uni.navigateTo({
		url: url
	});
};

onShow(() => {
	fetch();
});
</script>

<style lang="scss">
.content {
	padding: 10px;
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
	width: 24px;
	border-radius: 5px;
	border-color: #eee;
	overflow: hidden;
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

.btn-contain {
	display: flex;
	align-items: center;
}
</style>
