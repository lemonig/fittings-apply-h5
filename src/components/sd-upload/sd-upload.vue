<template>
	<view class="center">
		<!-- 上传图片 -->
		<view class="uploadClass">
			<view class="imgClass" v-for="(item, i) in imgList" :key='i' @click="viewImage(i, imgList)">
				<image style="width: 100%;height: 100%;" :src="item"></image>
				<view @click.stop="delImg(i, imgList, imgsID)" style="display: inline;">
					<uni-icons type="closeempty" class="closeClass" size="20"></uni-icons>
				</view>
			</view>
			<view v-show='curTotal < 3' class="cameraClass" @tap="upload">
				<image style="width: 48rpx; height: 38rpx;" src="@/static/appCenter/zhaoxiangji@2x.png"></image>
			</view>
			<!-- 图片数量提示 -->
			<view class="totalClass">{{curTotal}}/3</view>
		</view>
</template>
<script>
export default {
	name: 'sd-upload',
	data() {
		return {};
	},
	methods: {
		// 图片选择上传
		upload() {
			var _self = this;
			// 图片选择，只支持一次选择一张图片
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], //从相册、相机选择
				success: function (res) {
					_self.curTotal++;
					_self.imgList.push(res.tempFilePaths[0]);
					const tempFilePaths = res.tempFilePaths[0];
					// 图片上传
					const uploadTask = uni.uploadFile({
						url: 'http://22.189.25.91:9988/admin/sys-file/upload', 
						filePath: tempFilePaths,
						name: 'file', 
						header: {
							'Content-Type': 'multipart/form-data',
							Authorization: getApp().globalData.token || 'Basic YXBwOmFwcA=='
						},
						success: function (uploadFileRes) {
							_self.imgsID.push(JSON.parse(uploadFileRes.data).data.fileId);
							console.log('_self.imgsID:', _self.imgsID);
						},
						fail: function (uploadFileFail) {
							console.log('Error:', uploadFileFail.data);
						},
						complete: () => {
							console.log('Complete:');
						}
					});
				},
				error: function (e) {
					console.log(e);
				}
			});
		},
		viewImage(i, imgList) {
			let imgurl = []
			imgList.forEach(item => imgurl.push(item))
			uni.previewImage({
				urls: imgurl,
				current: imgList[i]
			});
		},
		delImg(i, imgList, imgsID) {
			uni.showModal({
				title: '提示',
				content: '确定要删除照片吗？',
				cancelText: '取消',
				confirmText: '确定',
				success: res => {
					if(res.confirm) {
						imgList.splice(i, 1);
						imgsID.splice(i, 1);
						this.curTotal--;
					}
				}
			})
		},
	}
};
</script>

<style></style>
