<template>
	<text class="sd-tag" :class="tagClass">
		{{ text }}
	</text>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps(['color', 'text']);

const tagClass = computed(() => `tag tag-${props.color || 'default'}`);
</script>

<style lang="scss">
.sd-tag {
	line-height: 14px;
	font-size: 12px;
	font-weight: 200;
	padding: 4px 7px;
	color: #fff;
	border-radius: 3px;
	background-color: #8f939c;
	border-width: 1px;
	border-style: solid;
	border-color: #8f939c;
	cursor: pointer;
}
.tag {
	display: inline-block;
	padding: 4px 8px;
	border-radius: 4px;
	font-size: 14px;
	font-weight: bold;
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
	// color: $s-magenta-7;
	// background: $s-magenta-1;
	// border-color: $s-magenta-3;
}

.tag-red {
	background-color: red;
	color: #fff;
}

.tag-volcano {
	background-color: #ff4d4f;
	color: #fff;
}

.tag-orange {
	background-color: orange;
	color: #fff;
}

.tag-gold {
	background-color: gold;
	color: #fff;
}

.tag-lime {
	background-color: lime;
	color: #fff;
}

.tag-green {
	background-color: green;
	color: #fff;
}

.tag-cyan {
	background-color: cyan;
	color: #fff;
}

.tag-blue {
	background-color: blue;
	color: #fff;
}

.tag-geekblue {
	background-color: #2f54eb;
	color: #fff;
}

.tag-purple {
	background-color: purple;
	color: #fff;
}
</style>