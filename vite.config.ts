import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@components": path.resolve(__dirname, "./src/common/components"),
			"@constants": path.resolve(__dirname, "./src/common/constants"),
			"@hooks": path.resolve(__dirname, "./src/common/hooks"),
			"@modules": path.resolve(__dirname, "./src/modules"),
			"@types": path.resolve(__dirname, "./src/common/types"),
			"@utilities": path.resolve(__dirname, "./src/common/utilities"),
		},
	},
});
