<template>
	<view class="content">
		<uni-list>
			<!-- 显示圆形头像 -->
			<uni-list-item v-for="(item, index) in pageData" :title="item.applicant" :note="item.applicationTime" :rightText="item.shippingStatus.label"></uni-list-item>
		</uni-list>
	</view>
</template>

<script setup>
import { pageRequisition as pageRequisitionApi } from '@/api/index.js';
import { ref, onMounted } from 'vue';

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

function onNavigationBarButtonTap(e) {
	console.log(e);
	uni.navigateTo({
		url: `/pages/stationList/stationList`,
		success(res) {
			console.log(res);
		},

		fail(res) {
			console.log(res);
		}
	});
}
function onShow() {}

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
