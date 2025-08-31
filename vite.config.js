import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	// base 的寫法：
	// base: '/Repository 的名稱/'
	//這裡記得要改成 /QUANTIS-frontend/
	base: "/QUANTIS-frontend/",
	plugins: [react()],
	server: {
		port: 3000,
		open: true,
	},
	build: {
		outDir: "dist",
		sourcemap: false,
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "bootstrap/scss/functions"; @import "bootstrap/scss/variables"; @import "bootstrap/scss/mixins";`,
			},
		},
	},
});
