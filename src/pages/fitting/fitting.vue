<template>
	<view class="content">
		<uni-search-bar clearButton="auto" cancelButton="none" @input="search"></uni-search-bar>
		<view class="search-bar">
			<view class="search-bar-item">
				<uni-data-picker placeholder="请选择" popup-title="配件分类" :localdata="fitOptions" v-model="fitData" @change="bindPickerChange"></uni-data-picker>
			</view>
			<view class="search-bar-item">
				<uni-data-picker placeholder="请选择" popup-title="核销分类" :localdata="shredOptions" v-model="shredData" @change="bindPickerChange1"></uni-data-picker>
			</view>
			<view class="search-bar-item">
				<uni-data-picker
					placeholder="请选择"
					popup-title="核销分类"
					:localdata="deviceOptions"
					v-model="devData"
					:map="{ text: 'inventoryName', value: 'id' }"
					@change="bindPickerChange2"
				></uni-data-picker>
			</view>
		</view>
		<uni-list v-if="pageData.length">
			<uni-list-item v-for="(item, index) in pageData" :key="index" direction="row" clickable @click="gotoDetail(item.id)">
				<template v-slot:header>
					<view class="m-left" v-if="'photoList' in item">
						<image class="u-img" :src="item.photoList[0]?.url" mode="aspectFit"></image>
					</view>
				</template>
				<template v-slot:body>
					<view class="m-body">
						<view class="head">{{ item.inventoryName }}</view>
						<view class="row">
							<view>编码：{{ item.inventoryCode }}</view>
							<view>单位：{{ item.unitOfMeasure }}</view>
						</view>
						<view class="row">
							<view>规格：{{ item.specification }}</view>
						</view>
						<view class="row">
							<view>型号：{{ item.modelNumber }}</view>
						</view>
						<!-- 	<view class="note">
							<uni-tag :inverted="true" text="标签" type="primary" color="#f56c6c" />
						</view> -->

						<view class="row" style="margin-top: 12rpx">
							<sd-tag v-for="(item, index) in item.labelList" :key="index" :color="tagColor[index]" :text="item"></sd-tag>
							<!-- <uni-tag v-for="(item, index) in item.labelList" :key="index" style="margin-right: 8rpx" :inverted="true" :text="item" type="primary" size="mini" /> -->
						</view>
					</view>
				</template>
				<template v-slot:footer>
					<view style="display: flex; align-items: center">
						<uni-icons type="cart-filled" size="24" color="#f56c6c" @click="chooseFitting(item, $event)"></uni-icons>
					</view>
				</template>
			</uni-list-item>
		</uni-list>

		<template v-else>
			<sd-empty></sd-empty>
		</template>
	</view>
</template>

<script setup>
import { accessorySearch as accessorySearchApi } from '@/api/index.js';
import { instrumentList as instrumentListApi } from '@/api/public.js';
import { ref, onMounted } from 'vue';
import { debounce } from '@/common/util.js';
import SdEmpty from '@/components/sd-empty/sd-empty.vue';
import { reactive } from 'vue';
import { onReachBottom } from '@dcloudio/uni-app';

const loading = ref(false);
const pageData = ref([]);
const fitData = ref();
const fitOptions = ref([
	{
		text: '配件',
		value: '0'
	},
	{
		text: '耗材',
		value: '1'
	},
	{
		text: '整机',
		value: '2'
	}
]);
const tagColor = ref(['green', 'cyan', 'purple', 'magenta', 'pink', 'red']);

const shredData = ref();
const shredOptions = ref([
	{
		text: '非核销类',
		value: '0'
	},
	{
		text: '现场核销',
		value: '1'
	},
	{
		text: '寄回核销',
		value: '2'
	}
]);
const deviceOptions = ref([]);
const devData = ref();

const query = reactive({
	page: 1,
	pageSize: 20,
	total: 0,
	status: 'more'
});
const keywords = ref('');

const getOther = async () => {
	let res = await instrumentListApi();
	deviceOptions.value = res.data;
};

const fetch = async () => {
	if (loading.value === true) {
		return;
	}
	let params = {
		page: query.page,
		size: query.pageSize,
		data: {
			name: keywords.value,
			classification: fitData.value,
			verificationCategory: shredData.value,
			instrumentId: devData.value
		}
	};
	loading.value = true;
	let res = await accessorySearchApi(params);
	if (res.success) {
		query.total = res.additional_data.total;
		if (pageData.value.length == query.total) {
			query.status = 'noMore';
		} else {
			query.status = 'more';
			pageData.value = pageData.value.concat(res.data);
		}
	}
	loading.value = false;
};

function onNavigationBarButtonTap(e) {
	uni.navigateTo({
		url: `/pages/stationList/stationList`
	});
}

const chooseFitting = (item) => {
	event.stopPropagation();
	uni.$emit('UpData', {
		id: item.inventoryCode,
		name: item.inventoryName,
		unit: item.unitOfMeasure,
		type: item.classification.value
	});
	uni.navigateBack({
		delta: 1
	});
};

const search = debounce((res) => {
	keywords.value = res;
	fetch();
}, 300);

const gotoDetail = (id) => {
	uni.navigateTo({
		url: `/pages/fitting-detail/fitting-detail?fid=${id}`
	});
};

const bindPickerChange = (e) => {
	if (!!e.detail.value.length) {
		fitData.value = e.detail.value[0].value;
	}
	fetch();
};

const bindPickerChange1 = (e) => {
	if (!!e.detail.value.length) {
		shredData.value = e.detail.value[0].value;
	}
	fetch();
};

const bindPickerChange2 = (e) => {
	if (!!e.detail.value.length) {
		devData.value = e.detail.value[0].value;
	}
	fetch();
};

const handleReachBottom = debounce(function () {
	if (query.status == 'loading' || query.status == 'noMore') {
		return;
	}
	if (query.page * query.pageSize >= query.total) {
		query.status = 'noMore';
		return;
	}
	query.page++;
	fetch();
}, 300);

onReachBottom(
	debounce(() => {
		handleReachBottom();
	}, 500)
);

onMounted(() => {
	getOther();
	fetch();
});
</script>

<style lang="scss">
.search-bar {
	display: flex;
	align-items: center;
	.search-bar-item {
		flex: 1;
	}
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
	padding-bottom: 5px;
	.head {
		font-size: 16px;
		color: #3b4144;
		font-weight: 400;
		overflow: hidden;
		margin-bottom: 8px;
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

.content {
}

.text-area {
}

.title {
}
</style>
