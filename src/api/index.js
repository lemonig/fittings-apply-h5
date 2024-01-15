import Request from '@/utils/requset.js'
import operate from '@/common/operate.js'
let request = new Request().http




// 配件申请-分页列表 
export function pageRequisition(data) {
	return request({
		url: `/app/api/requisition/page`,
		data,
		method: "POST",
		token: operate.isToken()
	})
}
// app登录 
export function login(data) {
	return request({
		url: `/app/api/login`,
		data,
		method: "POST",
		token: operate.isToken()
	})
}
// 配件历史查询 
export function historyAccessory(data) {
	return request({
		url: `/app/api/accessory/history`,
		data,
		method: "POST",
		token: operate.isToken()
	})
}
// 配件搜索 
export function accessorySearch(data) {
	return request({
		url: `/app/api/accessory/search`,
		data,
		method: "POST",
		token: operate.isToken()
	})
}
// 创建配件领用申请 
export function addRequisition(data) {
	return request({
		url: `/app/api/requisition/add`,
		data,
		method: "POST",
		token: operate.isToken()
	})
}
// 创建配件核心申请 
export function addVerification(data) {
	return request({
		url: `/app/api/verification/add`,
		data,
		method: "POST",
		token: operate.isToken()
	})
}
// 图片上传 
export function picture(data) {
	return request({
		url: `/app/api/common/upload/picture`,
		data,
		method: "POST",
		token: operate.isToken()
	})
}
// 区域获取 
export function region(data) {
	return request({
		url: `/app/api/common/region`,
		data,
		method: "POST",
		token: operate.isToken()
	})
}
// 用户配件领用临时记录添加 
export function addRequisitionRawDetails(data) {
	return request({
		url: `/app/api/user/owner/requisitionRawDetails/add`,
		data,
		method: "POST",
		token: operate.isToken()
	})
}
// 用户配件领用临时记录删除 
export function deleteRequisitionRawDetails(data) {
	return request({
		url: `/app/api/user/owner/requisitionRawDetails/delete`,
		data,
		method: "POST",
		token: operate.isToken()
	})
}
// 用户配件领用临时记录列表 
export function listRequisitionRawDetails(data) {
	return request({
		url: `/app/api/user/owner/requisitionRawDetails/list`,
		data,
		method: "POST",
		token: operate.isToken()
	})
}
// 用户配件领用临时记录详情 
export function getDetail(data) {
	return request({
		url: `/app/api/user/owner/requisitionRawDetails/get`,
		data,
		method: "POST",
		token: operate.isToken()
	})
}
// 用户配件领用临时记录更新 
export function updateRequisitionRawDetails(data) {
	return request({
		url: `/app/api/user/owner/requisitionRawDetails/update`,
		data,
		method: "POST",
		token: operate.isToken()
	})
}
// 配件详情
export function requisitionGet(data) {
	return request({
		url: `/app/api/requisition/get`,
		data,
		method: "POST",
		token: operate.isToken()
	})
}