<template>
	<view class="content">
		<!-- <sd-map></sd-map> -->
		<!-- <iframe :src="pageData.trailUrl" frameborder="0" allowfullscreen height="100vh" width="100vw"></iframe> -->
		<web-view :src="pageData.trailUrl" :webview-styles="{ height: webviewHeight }"></web-view>
		<l-floating-panel :content-draggable="false" :defaultAnchor="1" :anchors="anchors" ref="floatingPanelRef" @update:height="getCurrentY">
			<view class="step-wrap">
				<sd-steps :options="optionList" active-color="rgba(0,0,0,0.88)" :active="active" direction="column" />
			</view>
		</l-floating-panel>
	</view>
</template>

<script setup>
import { kuaidiGet } from '@/api/logistics.js';
import SdMap from '@/components/sd-map/sd-map.vue';
import { ref, onMounted, reactive } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import sdSteps from '@/components/sd-steps/sd-steps.vue';
const { windowHeight } = uni.getSystemInfoSync();
const loading = ref(false);
const pageData = reactive({});
const active = ref(0);
const optionList = ref([]);
const anchors = ref([100, Math.round(0.6 * windowHeight)]);
const floatingPanelRef = ref(null);
const webviewHeight = ref();

const fetch = async (params) => {
	loading.value = true;
	let res = await kuaidiGet(params);
	if (res.success) {
		if (res.data) {
			Object.assign(pageData, res.data);
			optionList.value = res.data.data.map((i) => ({
				...i,
				title: i.status,
				desc: i.context
			}));
		}
		console.log(optionList.value);
	}
	loading.value = false;
};

onLoad(({ trackingNumber, trackingCompany }) => {
	if (trackingNumber) {
		fetch({
			trackingNumber,
			trackingCompany
		});
	}
});

onMounted(() => {
	floatingPanelRef.value.toAnchor(1);
});

const getCurrentY = (val) => {
	let height = uni.getSystemInfoSync().windowHeight - val;
	webviewHeight.value = height + 'px';
};
</script>

<style lang="scss">
.content {
	padding: 10px;
	background-color: #fff;
	.step-wrap {
		overflow-y: auto;
		height: 100%;
		text-align: center;
		padding: 15px;
	}
}
</style>
