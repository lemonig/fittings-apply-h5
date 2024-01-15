import {
	defineConfig
} from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import {
	join
} from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		uni(),
	],
	resolve: {
		alias: {
			'@': join(__dirname, "src"),
			'@pages': join(__dirname, "src/pages"),
			'@static': join(__dirname, "src/static"),
			'@images': join(__dirname, "src/static/images"),
		}
	},
	proxy: {
		// 配置代理规则
		'/app': {
			target: "http://192.168.168.9:8890",
			changeOrigin: true,
			secure: false,
			ws: false,
			pathRewrite: {
				'^/app': '/app'
			}
		},
	},
})