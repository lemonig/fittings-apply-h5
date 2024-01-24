<template>
	<view class="content">
		<uni-list v-if="pageData.length">
			<!-- 显示圆形头像 -->
			<uni-list-item
				v-for="(item, index) in pageData"
				:key="index"
				:title="item.applicant"
				:note="item.applicationTime"
				:rightText="item.shippingStatus.label"
				clickable="true"
				@click="gotoDetail(item.id)"
			></uni-list-item>
		</uni-list>
		<template v-else>
			<sd-empty></sd-empty>
		</template>
	</view>
</template>

<script setup>
import { pageRequisition as pageRequisitionApi } from '@/api/index.js';
import { ref, onMounted } from 'vue';
import { onReady, onNavigationBarButtonTap } from '@dcloudio/uni-app';

const loading = ref(false);
const pageData = ref([]);

const fetch = async () => {
	loading.value = true;
	let res = await pageRequisitionApi();
	if (res.success) {
		pageData.value = res.data;
	}
	loading.value = false;
};

const gotoDetail = (id) => {
	uni.navigateTo({
		url: `/pages/matter-detail/matter-detail?id=${id}`,
		success(res) {
			console.log(res);
		},
		fail(res) {
			console.log(res);
		}
	});
};

onNavigationBarButtonTap((e) => {
	console.log(e);
	uni.navigateTo({
		url: `/pages/trolley/trolley`,
		success(res) {
			console.log(res);
		},
		fail(res) {
			console.log(res);
		}
	});
});

onReady(() => {
	console.log('Component has been onReady');
});

// 生命周期钩子
onMounted(() => {
	fetch();
	console.log('Component has been mounted');
});
</script>

<style>
.content {
}

.text-area {
}

.title {
}
</style>
