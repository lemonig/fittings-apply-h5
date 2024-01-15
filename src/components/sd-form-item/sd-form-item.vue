<template>
	<uni-forms-item :label="form.widgetName" :name="form.field" :required="form.isRquired">
		<text style="color: rgba(0, 0, 0, 0.5)">{{ form.title }}</text>
		<!-- <view v-if="form.widgetTypeCode === 'TEXT_DESCRIPTION'"></view> -->
		<uni-easyinput v-if="form.widgetTypeCode === 'SINGLE_LINE_TEXT_INPUT_BOX'" trim="all" v-model="form.value" :placeholder="form.placeholder" :disabled="form.canMdify" />
		<uni-easyinput v-else-if="form.widgetTypeCode === 'MULTI_LINE_TEXT_INPUT_BOX'" type="textarea" v-model="form.value" :placeholder="form.placeholder" :disabled="form.canMdify" />
		<uni-easyinput
			v-else-if="form.widgetTypeCode === 'NUMBER_INPUT_BOX'"
			trim="all"
			type="digit"
			v-model="form.value"
			placeholder="请输入内容"
			:disabled="form.canMdify"
		></uni-easyinput>
		<uni-datetime-picker v-else-if="form.widgetTypeCode === 'DATE_INPUT_BOX'" type="date" v-model="form.value" :placeholder="form.placeholder" :disabled="form.canMdify" />
		<uni-datetime-picker
			v-else-if="form.widgetTypeCode === 'DATE_TIME_INPUT_BOX'"
			type="datetime"
			:placeholder="form.placeholder"
			:disabled="form.canMdify"
			@change="datetimeChange"
			return-type="date"
		/>
		<uni-data-checkbox v-else-if="form.widgetTypeCode === 'RADIO'" :localdata="form.dictItemList" v-model="form.value" :disabled="form.canMdify" />
		<uni-data-checkbox v-else-if="form.widgetTypeCode === 'CHECKBOX'" :localdata="form.dictItemList" v-model="form.value" multiple :disabled="form.canMdify" />
		<uni-data-picker
			v-else-if="form.widgetTypeCode === 'CASCADING_SELECT_BOX'"
			:placeholder="form.placeholder"
			popup-title="请选择"
			:localdata="form.dictItemList"
			v-model="form.value"
			:disabled="form.canMdify"
		></uni-data-picker>
		<uni-file-picker
			v-else-if="form.widgetTypeCode === 'PHOTO_UPLOAD'"
			:limit="form.photoMaxCount"
			:title="`最少选择${form.photoMinCount}张,最多选择${form.photoMaxCount}张图片`"
			file-mediatype="image"
			mode="grid"
			v-model="form.value"
			:sizeType="['compressed']"
			@select="onUploadSuccess"
			:disabled="form.canMdify"
		></uni-file-picker>
		<uni-number-box v-else-if="form.widgetTypeCode === 'WALKER'" v-model="form.value" :placeholder="form.placeholder" :disabled="form.canMdify" />
		<sd-select
			v-else-if="form.widgetTypeCode === 'SEARCH_RADIO'"
			v-model="form.value"
			:options="form.dictItemList"
			:placeholder="form.placeholder"
			@onSearch="handleSearch"
			:disabled="form.canMdify"
		></sd-select>
		<sd-form-map v-else-if="form.widgetTypeCode === 'POSITIONING'" v-model="form.value" :placeholder="form.placeholder" :disabled="form.canMdify"></sd-form-map>
	</uni-forms-item>
</template>

<script>
import SdSelect from '@/components/sd-search-select/sd-search-select.vue';
import SdFormMap from '@/components/sd-form-map/sd-form-map.vue';
import { uploadImg } from '@/api/public.js';
import { compressImage } from '@/common/util.js';
import { dictBusiness, dictStatic } from '@/api/form.js';
import dayjs from 'dayjs';

export default {
	name: 'sd-form-item',
	components: {
		SdSelect,
		SdFormMap
	},
	props: {
		formItem: {
			type: Object,
			default: () => {
				return {};
			}
		},
		formData: {
			type: Array,
			default: () => {
				return [];
			}
		},
		groupIdx: {
			type: Number,
			default: () => {
				return -1;
			}
		},
		formType: {
			type: String,
			default: () => {
				return '';
			}
		},
		formObj: {
			type: Object,
			default: () => {
				return {};
			}
		}
	},

	data() {
		return {
			loading: false,
			form: this.formItem,
			file: [],
			options: []
		};
	},

	mounted() {
		// if (this.formItem.dictTpe == 'business') {
		// 	this.getBusiness({ code: this.formItem.dictCde }).then((res) => {
		// 		this.options = res.data;
		// 	});
		// } else if (this.formItem.dictTpe == 'static') {
		// 	this.getStatic({ code: this.formItem.dictCde }).then((res) => {
		// 		this.options = res.data;
		// 	});
		// }
	},

	methods: {
		getFormOption() {},
		async getBusiness({ code = this.formItem.dictCde, value = '' }) {
			return await dictBusiness({
				code,
				value
			});
		},
		async getStatic({ code = this.formItem.dictCde, value = '' }) {
			return await dictStatic({
				code,
				value
			});
		},
		getDefaultTime() {
			return dayjs().format('YYYY-MM-DD');
		},

		datetimeChange(e) {
			console.log(dayjs(e).format().includes('T'));
			console.log(dayjs(e).format('YYYY-MM-DD HH:mm:ss'));
			this.form.value = dayjs(e).format('YYYY-MM-DD HH:mm:ss');
		},

		onUploadSuccess(res) {
			this.uploadToServer(res.tempFiles[0].file);
		},
		async uploadToServer(file) {
			let filec = await compressImage(file);
			let res = await uploadImg(filec);
			let resobj = JSON.parse(res);
			this.form.value.push({
				name: 'tu.png',
				extname: 'png',
				url: resobj.data
			});
		},

		async handleSearch(value) {
			if (this.formItem.dictTpe == 'business') {
				this.getBusiness({ value }).then((res) => {
					this.options = res.data;
				});
			} else if (this.formItem.dictTpe == 'static') {
				this.getStatic({ value }).then((res) => {
					this.options = res.data;
				});
			}
		}
	}
};
</script>

<style></style>
