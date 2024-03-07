import Request from '@/utils/requset.js'
import operate from '@/common/operate.js'
let request = new Request().http
// 发货详细
export function deliveryList(data) {
	return request({
		url: `/app/api/requisition/delivery/list`,
		data,
		method: "POST",
		token: operate.isToken()
	})
}
// 物流

export function kuaidiGet(data) {
	return request({
		url: `/app/api/common/kuaidi/get`,
		data,
		method: "POST",
		token: operate.isToken()
	})
}