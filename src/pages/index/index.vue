<template>
	<view class="content">
		<uni-nav-bar
			title="导航栏组件"
			:border="false"
			right-icon="plusempty"
			backgroundColor="rgb(241,241,241)"
			leftIcon="paperplane"
			@clickRight="gotoPage"
			@clickLeft="gotoComsumer"
		>
			<view class="nav-title">标题栏</view>
		</uni-nav-bar>
		<uni-list v-if="pageData.length">
			<!-- 显示圆形头像 -->
			<uni-list-item
				v-for="(item, index) in pageData"
				:key="index"
				:title="item.applicant"
				:note="'申请时间：' + item.applicationTime"
				clickable="true"
				@click="gotoDetail(item.id)"
			>
				<template v-slot:footer>
					<view class="row" style="margin-top: 12rpx">
						<text style="color: #ff6a00; font-size: 14px; margin: 0 3px">{{ item.approvalStatus.label }}</text>
						<text style="color: #ff6a00; font-size: 14px; margin: 0 3px">{{ item.shippingStatus.label }}</text>
						<!-- 						<sd-tag :color="statusColor1[item.approvalStatus.value]" :text="item.approvalStatus.label"></sd-tag>
						<sd-tag :color="statusColor[item.shippingStatus.value]" :text="item.shippingStatus.label"></sd-tag> -->
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
import { pageRequisition as pageRequisitionApi } from '@/api/index.js';
import { ref, onMounted } from 'vue';
import { onReady, onNavigationBarButtonTap } from '@dcloudio/uni-app';

const loading = ref(false);
const pageData = ref([]);

const statusColor = ['default', 'warning', 'success'];
const statusColor1 = ['default', 'primary', 'success', 'warning', 'danger'];

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

const gotoPage = (e) => {
	uni.navigateTo({
		url: `/pages/trolley/trolley`,
		success(res) {
			console.log(res);
		},
		fail(res) {
			console.log(res);
		}
	});
};
const gotoComsumer = () => {
	window.location.href = 'https://www.greandata.com:10018/';
};

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
.row {
}
.nav-title {
	align-items: center;
	justify-content: center;
	font-weight: bold;
	font-size: 16px;
	line-height: 30px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
/deep/ .uni-navbar__header-container {
	justify-content: center;
	align-items: center;
}
</style>
