<template>
	<view class="content">
		<uni-search-bar clearButton="auto" cancelButton="none" @input="search"></uni-search-bar>

		<uni-list v-if="pageData.length">
			<uni-list-item v-for="(item, index) in pageData" :key="index" :title="item.name" :rightText="item.num" clickable @click="chooseFitting(item.num)"></uni-list-item>
		</uni-list>

		<template v-else>
			<sd-empty></sd-empty>
		</template>
	</view>
</template>

<script setup>
import { projectSearch as projectSearchApi } from '@/api/index.js';
import { ref, onMounted } from 'vue';
import { debounce } from '@/common/util.js';
import SdEmpty from '@/components/sd-empty/sd-empty.vue';
import { reactive } from 'vue';
import { onReachBottom } from '@dcloudio/uni-app';
import { mtype, utype, shredOptions } from '@/common/constant.js';
import SdImg from '@/components/sd-img/sd-img.vue';

const loading = ref(false);
const pageData = ref([]);
const fitData = ref();

const shredData = ref();

const devData = ref();

const query = reactive({
	page: 1,
	pageSize: 20,
	total: 0,
	status: 'more'
});
const keywords = ref('');

const fetch = async (flag) => {
	if (loading.value === true) {
		return;
	}
	if (flag) pageData.value = [];
	let params = {
		page: query.page,
		size: query.pageSize,
		data: {
			name: keywords.value
		}
	};
	loading.value = true;
	let res = await projectSearchApi(params);
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

// function onNavigationBarButtonTap(e) {
// 	uni.navigateTo({
// 		url: `/pages/stationList/stationList`
// 	});
// }

const chooseFitting = (item) => {
	event.stopPropagation();
	uni.$emit('UpData1', {
		projectNumber: item
	});
	uni.navigateBack({
		delta: 1
	});
};

const search = debounce((res) => {
	keywords.value = res;
	fetch(true);
}, 300);

const handleReachBottom = debounce(function () {
	if (query.status == 'loading' || query.status == 'noMore') {
		return;
	}
	if (query.page * query.pageSize >= query.total) {
		query.status = 'noMore';
		return;
	}
	query.page++;
	fetch(false);
}, 300);

onReachBottom(
	debounce(() => {
		handleReachBottom();
	}, 500)
);

onMounted(() => {
	fetch(false);
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
	padding-bottom: 5px;
	.head {
		font-size: 16px;
		color: #3b4144;
		font-weight: bold;
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
