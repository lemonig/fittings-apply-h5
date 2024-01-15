<template>
	<picker @change="bindPickerChange" :value="currentIndex" :range="options" mode="selector">
		<view class="sd-select">
			<view class="sd-select__input-box">
				<view v-if="!!currentIndex" class="sd-select__input-text">{{ options[currentIndex] }}</view>
				<view v-else class="sd-select__input-text sd-select__input-placeholder">请选择</view>
				<uni-icons type="bottom" size="14" style="color: rgb(153, 153, 153)"></uni-icons>
			</view>
		</view>
	</picker>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue';
const currentIndex = ref(0);
const { value, options = [], onChange } = defineProps(['value', 'options', 'onChange']);
const selectedValue = ref(value);

const bindPickerChange = (e) => {
	console.log('picker发送选择改变，携带值为', e.detail.value);
	currentIndex.value = e.detail.value;
	onChange(e.detail.value);
};

watch(
	() => value,
	(newValue) => {
		selectedValue.value = newValue;
	}
);
</script>

<style lang="scss">
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
