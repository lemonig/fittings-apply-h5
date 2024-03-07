<template>
	<view class="map-wrap">
		<view class="map_container">
			<view id="map" ref="map"></view>
		</view>
	</view>
</template>

<script setup>
import { ref, defineProps, watch, onMounted } from 'vue';
// const locationPng = '/static/location1.png';
/* global AMap */
let mapIcon = null;
const props = defineProps(['lat', 'lng']);
const mapRef = ref(null);
const aMap = ref(null);
const mapMove = ref(null);
const centerPixel = ref({
	//中心点坐标
	y: '-999',
	x: '-999'
});
const centerPoi = ref([0, 0]);

onMounted(() => {
	drawMap();
	// uni.getLocation({
	// 	type: 'wgs84',
	// 	isHighAccuracy: true,
	// 	success: function ({ longitude, latitude }) {
	// 		centerPoi.value = [longitude, latitude];
	// 	},
	// 	fail(res) {
	// 		console.log(res);
	// 	},
	// 	complete() {
	// 		drawMap();
	// 	}
	// });
});

const drawMap = () => {
	aMap.value = new AMap.Map('map', {
		zoom: 16,
		center: centerPoi.value,
		resizeEnable: false,
		showIndoorMap: false, // 是否在有矢量底图的时候自动展示室内地图，PC默认true,移动端默认false
		dragEnable: false, // 地图是否可通过鼠标拖拽平移，默认为true
		keyboardEnable: false, //地图是否可通过键盘控制，默认为true
		doubleClickZoom: false, // 地图是否可通过双击鼠标放大地图，默认为true
		zoomEnable: false, //地图是否可缩放，默认值为true
		rotateEnable: false // 地图是否可旋转，3D视图默认为true，2D视图默认false
	});

	// mapIcon = new AMap.Icon({
	// 	image: locationPng,
	// 	size: new AMap.Size(26, 44)
	// });

	getLocation();
};

function getLocation() {
	AMap.plugin('AMap.Geolocation', function () {
		var geolocation = new AMap.Geolocation({
			timeout: 100000, //超过10秒后停止定位，默认：5s
			buttonPosition: 'RB', //定位按钮的停靠位置
			showCircle: false, //定位成功后用圆圈表示定位精度范围，默认：true
			// markerOptions: {
			// 	icon: mapIcon,
			// 	anchor: 'bottom-center' //设置点标记锚点。
			// },
			useNative: true,
			offset: [10, 20], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
			zoomToAccuracy: false, //定位成功后是否自动调整地图视野到定位点, bug:开启后只能调整到center
			extensions: 'all', //用来设定是否需要周边POI、道路交叉口等信息，可选值'base'、'all'。
			panToLocation: true //定位成功后将定位到的位置作为地图中心点，默认：true
		});
		aMap.value.addControl(geolocation);
		geolocation.getCurrentPosition(function (status, result) {
			if (status == 'complete') {
				onComplete(result);
			}
		});
	});
}

const onComplete = (result) => {
	let lnglat = aMap.value.getCenter();
	// this.formattedAddress = result.formattedAddress;
	// this.centerPoi = [lnglat.lng, lnglat.lat];
	// this.$emit('input', {
	// 	lat: lnglat.lat,
	// 	lng: lnglat.lng,
	// 	address: result.formattedAddress
	// });
};
</script>

<style lang="scss">
::v-deep .amap-logo {
	opacity: 0 !important;
}
::v-deep .amap-copyright {
	opacity: 0 !important;
}

.map-wrap {
	position: relative;
	height: 100vh;
}
#map_container {
	flex: 1;
	position: relative;
	height: 100%;
}
#map {
	width: 100%;
	height: 100vh;
}
#center_icon {
	position: absolute;
	/* z-index: 101; */
}
#center_icon > img {
	width: 32px;
	height: 32px;
	position: relative;
	top: -32px;
	left: -16px;
}

.location {
	width: 25px;
	height: 25px;
	line-height: 25px;
	text-align: center;
	background-color: #eee;
	position: absolute;
	bottom: 8px;
	left: 8px;
	z-index: 2200;
}

/* .gray-circle-icon {
	display: block;
	width: 4px;
	height: 4px;
	border: 1px solid rgba(128, 128, 128, 0.5);
	border-radius: 50%;
} */

/* .pinAnima {
	animation: bounce 1.5s normal;
} */

@keyframes bounce {
	0% {
		transform: translateY(0);
	}
	20% {
		transform: translateY(-20px);
	}
	40% {
		transform: translateY(0px);
	}
	60% {
		transform: translateY(-20px);
	}
	100% {
		transform: translateY(0);
	}
}

/* select */
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
	width: 100%;
}
.sd-select__input-text {
	width: 100%;
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