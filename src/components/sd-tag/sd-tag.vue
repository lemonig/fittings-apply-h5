<template>
	<text class="sd-tag" :class="tagClass">
		{{ text }}
	</text>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps(['color', 'text']);

const tagClass = computed(() => ` tag-${props.color || 'default'}`);
</script>

<style lang="scss">
@import '../../theme/scolor.scss';
.sd-tag {
	line-height: 14px;
	font-size: 12px;
	padding: 0;
	margin: 0;
	display: inline-block;
	height: auto;
	color: #fff;
	border-radius: 3px;
	background-color: #8f939c;
	border-width: 1px;
	border-style: solid;
	cursor: pointer;
	margin-inline-end: 8px;
	padding-inline: 7px;
}

.tag-default {
	background-color: #ccc;
	color: #333;
}

/* 添加更多颜色的样式类 */
.tag-primary {
	background-color: #3498db;
	color: #fff;
}

.tag-success {
	background-color: #2ecc71;
	color: #fff;
}

.tag-warning {
	background-color: #f39c12;
	color: #fff;
}

.tag-danger {
	background-color: #e74c3c;
	color: #fff;
}

.tag-magenta {
	color: $sd-magenta-7;
	background: $sd-magenta-1;
	border-color: $sd-magenta-3;
}

.tag-red {
	color: $sd-magenta-7;
	background: $sd-magenta-1;
	border-color: $sd-magenta-3;
}

.tag-volcano {
	color: $sd-volcano-7;
	background: $sd-volcano-1;
	border-color: $sd-volcano-3;
}

.tag-orange {
	color: $sd-magenta-7;
	background: $sd-magenta-1;
	border-color: $sd-magenta-3;
}

.tag-gold {
	color: $sd-gold-7;
	background: $sd-gold-1;
	border-color: $sd-gold-3;
}

.tag-lime {
	color: $sd-lime-7;
	background: $sd-lime-1;
	border-color: $sd-lime-3;
}

.tag-green {
	color: $sd-magenta-7;
	background: $sd-magenta-1;
	border-color: $sd-magenta-3;
}

.tag-cyan {
	color: $sd-cyan-7;
	background: $sd-cyan-1;
	border-color: $sd-cyan-3;
}

.tag-blue {
	color: $sd-blue-7;
	background: $sd-blue-1;
	border-color: $sd-blue-3;
}

.tag-geekblue {
	color: $sd-geekblue-7;
	background: $sd-geekblue-1;
	border-color: $sd-geekblue-3;
}

.tag-purple {
	color: $sd-purple-7;
	background: $sd-purple-1;
	border-color: $sd-purple-3;
}
</style>
