import Request from '@/utils/requset.js'
import operate from '@/common/operate.js'
let request = new Request().http


// 当前用户地址分页列表 
export function addresspage(data) {
	return request({
		url: `/app/api/user/owner/address/page`,
		data: data,
		method: "POST",
		token: operate.isToken()
	})

}

// 当前用户添加地址 
export function addAddress(data) {
	return request({
		url: `/app/api/user/owner/address/add`,
		data,
		method: "POST",
		token: operate.isToken()
	})
}
// 当前用户更新地址 
export function updateAddress(data) {
	return request({
		url: `/app/api/user/owner/address/update`,
		data,
		method: "POST",
		token: operate.isToken()
	})
}
// 当前用户删除地址 
export function deleteAddress(data) {
	return request({
		url: `/app/api/user/owner/address/delete`,
		data,
		method: "POST",
		token: operate.isToken()
	})
}
export function getAddress(data) {
	return request({
		url: `/app/api/user/owner/address/get`,
		data,
		method: "POST",
		token: operate.isToken()
	})
}