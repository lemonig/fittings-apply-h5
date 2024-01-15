import Request from '@/utils/requset.js'
import operate from '@/common/operate.js'
import {
	compressImage
} from '@/common/util.js'

let request = new Request().http

// 按需引入的 请求头
export const uploadImg = function(file) {
	return new Promise((rso, rej) => {
		uni.uploadFile({
			url: '/app/api/common/upload/picture',
			file: file,
			name: 'file', // 服务器接收的文件字段名
			header: {
				'app-token': operate.isToken()
			},
			success: (uploadRes) => {
				console.log(uploadRes);
				rso(uploadRes.data)
			},
			fail: (uploadErr) => {
				console.error('上传到服务器失败', uploadErr);
				rej(uploadErr)
			}
		});
	})

}

// 按需引入的 请求头
export const stationList = function(data) {
	return request({
		url: "/api/station/list",
		method: "POST",
		data: data,
		token: operate.isToken()
	})
}
//省份查询
export const provinceList = function(data) {
	return request({
		url: "/api/org/region/list",
		method: "GET",
		data: data,
		token: operate.isToken()
	})
}
//省份查询
export const regionList = function(data) {
	return request({
		url: "/app/api/common/region",
		method: "Post",
		data: data,
		token: operate.isToken()
	})
}
// 用户吗默认地址
export const addressDefault = function(data) {
	return request({
		url: "/app/api/user/owner/address/default",
		method: "Post",
		data: data,
		token: operate.isToken()
	})
}
export const regionListTree = function(data) {
	return request({
		url: "/app/api/common/region/tree",
		method: "Post",
		data: data,
		token: operate.isToken()
	})
}
// 配件详情
export const accessoryDetail = function(data) {
	return request({
		url: "/app/api/accessory/get",
		method: "Post",
		data: data,
		token: operate.isToken()
	})
}
// 配件详情
export const instrumentList = function(data) {
	return request({
		url: "/app/api/accessory/instrument/list",
		method: "Post",
		data: data,
		token: operate.isToken()
	})
}