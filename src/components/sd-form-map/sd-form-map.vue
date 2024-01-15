<template>
	<view class="map-wrap">
		<view class="sd-select">
			<view class="sd-select__input-box">
				<view v-if="!!formattedAddress" class="sd-select__input-text">{{ formattedAddress }}</view>
				<view v-else class="sd-select__input-text sd-select__input-placeholder">{{ placeholder }}</view>
			</view>
		</view>
		<view class="map_container">
			<view id="map"></view>
			<!-- <cover-view
				id="center_icon"
				:style="{
					left: `${centerPixel.x}px`,
					top: `${centerPixel.y}px`
				}"
			>
				<cover-image src="/static/location1.png" alt="loc" :class="mapMove ? 'pinAnima' : ''" />
			</cover-view> -->
		</view>

		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
const locationPng = '/static/location1.png';
let mapIcon = null;
export default {
	name: 'sd-form-map',
	props: {
		value: {
			type: Object,
			default() {
				return {
					address: '',
					lat: 0,
					lng: 0
				};
			}
		},
		placeholder: {
			type: String
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
			mapRef: null,
			formattedAddress: '',
			aMap: null,
			mapMove: false,
			msgType: 'success',
			messageText: '这是一条成功提示',
			centerPixel: {
				//中心点坐标
				y: '-999',
				x: '-999'
			},

			centerPoi: [0, 0]
		};
	},
	created() {},

	mounted() {
		let _this = this;
		uni.getLocation({
			type: 'wgs84',
			isHighAccuracy: true,
			success: function ({ longitude, latitude }) {
				_this.centerPoi = [longitude, latitude];
			},
			fail(res) {
				console.log(res);
				_this.msgType = 'error';
				_this.messageText = '获取定位错误';
				_this.$refs.message.open();
			},
			complete() {
				_this.drawMap();
			}
		});

		// let _this = this;
		// if (this.value.address && this.value.lat) {
		// 	this.centerPoi = [this.value.lng, this.value.lat];
		// 	this.formattedAddress = this.value.address;
		// 	_this.drawMap();
		// } else {
		// 	uni.getLocation({
		// 		type: 'wgs84',
		// 		isHighAccuracy: true,
		// 		success: function ({ longitude, latitude }) {
		// 			_this.centerPoi = [longitude, latitude];
		// 		},
		// 		fail(res) {
		// 			_this.msgType = 'error';
		// 			_this.messageText = '获取定位错误';
		// 			_this.$refs.message.open();
		// 		},
		// 		complete() {
		// 			_this.drawMap();
		// 		}
		// 	});
		// }
	},

	methods: {
		drawMap() {
			let _this = this;
			this.aMap = new AMap.Map('map', {
				zoom: 16,
				center: _this.centerPoi,
				resizeEnable: false,
				showIndoorMap: false, // 是否在有矢量底图的时候自动展示室内地图，PC默认true,移动端默认false
				dragEnable: false, // 地图是否可通过鼠标拖拽平移，默认为true
				keyboardEnable: false, //地图是否可通过键盘控制，默认为true
				doubleClickZoom: false, // 地图是否可通过双击鼠标放大地图，默认为true
				zoomEnable: false, //地图是否可缩放，默认值为true
				rotateEnable: false // 地图是否可旋转，3D视图默认为true，2D视图默认false
			});

			mapIcon = new AMap.Icon({
				image: locationPng,
				size: new AMap.Size(26, 44)
			});

			this.getLocation();
			// if (!_this.value.address) {
			// }
		},
		getLocation() {
			let _this = this;
			AMap.plugin('AMap.Geolocation', function () {
				var geolocation = new AMap.Geolocation({
					timeout: 100000, //超过10秒后停止定位，默认：5s
					buttonPosition: 'RB', //定位按钮的停靠位置
					showCircle: false, //定位成功后用圆圈表示定位精度范围，默认：true
					markerOptions: {
						icon: mapIcon,
						anchor: 'bottom-center' //设置点标记锚点。
					},
					useNative: true,
					offset: [10, 20], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
					zoomToAccuracy: false, //定位成功后是否自动调整地图视野到定位点, bug:开启后只能调整到center
					extensions: 'all', //用来设定是否需要周边POI、道路交叉口等信息，可选值'base'、'all'。
					panToLocation: true //定位成功后将定位到的位置作为地图中心点，默认：true
				});
				// _this.aMap.setZoom(16);
				_this.aMap.addControl(geolocation);
				geolocation.getCurrentPosition(function (status, result) {
					if (status == 'complete') {
						_this.onComplete(result);
					} else {
						_this.msgType = 'warn';
						_this.messageText = result.message;
						_this.$refs.message.open();
					}
				});
			});
		},

		onComplete(result) {
			let lnglat = this.aMap.getCenter();
			this.formattedAddress = result.formattedAddress;
			this.centerPoi = [lnglat.lng, lnglat.lat];
			this.$emit('input', {
				lat: lnglat.lat,
				lng: lnglat.lng,
				address: result.formattedAddress
			});
		}
	}
};
</script>

<style>
::v-deep .amap-logo {
	opacity: 0 !important;
}
::v-deep .amap-copyright {
	opacity: 0 !important;
}

.map-wrap {
	position: relative;
}
#map_container {
	flex: 1;
	position: relative;
}
#map {
	width: 100%;
	height: 300px;
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
