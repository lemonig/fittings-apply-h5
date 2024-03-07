<template>
	<view class="machine-contain">
		<image v-if="url" :src="url" mode="aspectFit" v-bind="props"></image>
		<image v-else src="../../static/image/machine.svg" mode=""></image>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps(['url']);
</script>

<style lang="scss">
.machine-contain {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
