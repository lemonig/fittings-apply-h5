/**
 * @param {Object} time
 */
function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

/**
 * @param {Object} longitude
 * @param {Object} latitude
 */
function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	/**
	 * @param {Object} dateStr
	 */
	format: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function(number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};

/**
 * @param {Object} func
 * @param {Object} delay
 */
function debounce(func, delay) {
	let timeout;
	return function(...args) {
		const context = this;
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			func.apply(context, args);
		}, delay);
	};
}

/**
 * @description 判断是否是数组
 * @param arg
 */
function isArray(arg) {
	if (typeof Array.isArray === 'undefined') {
		return Object.prototype.toString.call(arg) === '[object Array]'
	}
	return Array.isArray(arg)
}



/**
 * 压缩图片
 * @param {file} 输入图片
 * @returns {Promise} resolved promise 返回压缩后的新图片
 */
function compressImage(file) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.src = window.URL.createObjectURL(file);
		img.onerror = (error) => reject(error);
		img.onload = () => {
			const canvasWidth =
				document.documentElement.clientWidth * window.devicePixelRatio;
			const canvasHeight =
				document.documentElement.clientHeight * window.devicePixelRatio;
			const scaleX = canvasWidth / img.width;
			const scaleY = canvasHeight / img.height;
			const scale = Math.min(scaleX, scaleY);

			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");
			canvas.width = canvasWidth;
			canvas.height = canvasHeight;
			const imageWidth = img.width * scale;
			const imageHeight = img.height * scale;
			const dx = (canvasWidth - imageWidth) / 2;
			const dy = (canvasHeight - imageHeight) / 2;
			ctx.drawImage(img, dx, dy, imageWidth, imageHeight);
			const quality = 0.92;
			canvas.toBlob((file) => resolve(file), "image/jpeg", quality);
		};
	});
}


/**
 * @param {Object} code
 */
function getStatusText(code) {
	let text = ''
	switch (code) {
		case 1:
			text = "终止"
			break;
		case 3:
			text = "已提交"
			break;
		case 20:
			text = "未提交"
			break;
		case 21:
			text = "已过期"
			break;
		default:
			text = "未知"
			break;
	}
	return text
}

export {
	formatTime,
	formatLocation,
	dateUtils,
	debounce,
	isArray,
	compressImage,
	getStatusText
}