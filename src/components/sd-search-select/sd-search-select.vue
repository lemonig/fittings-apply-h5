<template>
	<view>
		<view class="sd-select" :class="{ 'uni-select--disable': disabled }" @click="showDrawer">
			<view class="sd-select__input-box">
				<view v-if="!!value && !!options.length" class="sd-select__input-text">{{ label }}</view>
				<view v-else class="sd-select__input-text sd-select__input-placeholder">请选择</view>
				<uni-icons type="bottom" size="14" style="color: rgb(153, 153, 153)"></uni-icons>
			</view>
		</view>

		<uni-popup ref="popup" background-color="#fff" type="bottom" :animation="false">
			<view
				class="popup-content"
				:style="{
					height: inerHeight + 'px'
				}"
			>
				<!-- <view style="height: 50px"> -->
				<!-- <uni-icons type="closeempty" size="14" style="color: rgb(153, 153, 153)" @click="closeDrawer"></uni-icons> -->
				<!-- </view> -->

				<uni-search-bar @confirm="search" :focus="false" v-model="searchValue" @input="input" @cancel="cancel" @clear="clear"></uni-search-bar>
				<scroll-view class="popup-main" scroll-y="true">
					<uni-list>
						<uni-list-item v-for="item in options" :key="item.value" :title="item.text" clickable @click="selected(item)" />
					</uni-list>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { debounce } from '../../common/util.js';
export default {
	name: 'sd-search-select',

	props: {
		value: {
			type: [String, Number]
		},

		options: {
			type: Array,
			default() {
				return [];
			}
		},
		disabled: {
			type: Boolean,
			default() {
				return false;
			}
		}
	},
	data() {
		return {
			internalValue: this.valuem,
			showDraw: false,
			searchValue: '',
			label: '',
			optionsCopy: [],
			inerHeight: ''
		};
	},
	watch: {
		value(newVal) {
			this.internalValue = newVal;
		},
		options(val) {
			this.label = this.findLabel(this.value, val);
		}
	},

	created() {},
	mounted() {
		let { windowHeight } = uni.getWindowInfo();
		console.log(windowHeight);
		this.inerHeight = windowHeight;

		this.optionsCopy = JSON.parse(JSON.stringify(this.options));
	},

	methods: {
		findLabel(value, options) {
			if (value && !!options.length) {
				let res = options.find((ele) => ele.value === value);
				if (res) {
					return res.text;
				}
			}
		},
		clickSelect() {},
		showDrawer() {
			if (this.disabled) {
				return;
			}
			this.$refs.popup.open();
		},
		closeDrawer() {
			this.$refs.popup.close();
		},
		search(res) {
			uni.showToast({
				title: '搜索：' + res.value,
				icon: 'none'
			});
		},

		matchItem(text) {
			let regex = new RegExp(text, 'i');
			return this.optionsCopy.filter((item) => regex.test(item.text));
		},

		input: debounce(function (res) {
			this.options = this.matchItem(res);

			// this.$emit('onSearch', res);
		}, 300),

		clear(res) {},

		cancel() {
			this.$refs.popup.close();
		},
		selected(eve) {
			console.log(eve);
			this.$emit('input', eve.value);
			this.label = eve.text;
			this.closeDrawer();
		}
	}
};
</script>

<style>
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

.popup-content {
	/* 	margin-top: constant(safe-area-inset-top);
	margin-top: env(safe-area-inset-top); */
}

.popup-main {
	/* padding-top: env(safe-area-inset-top); */
	/*兼容 IOS>11.2*/
	/* padding-top: env(safe-area-inset-top); */
	/*兼容 IOS>11.2*/
	height: calc(100% - 50px);
}

.uni-select--disable {
	background-color: #f5f7fa;
	cursor: not-allowed;
}
</style>
