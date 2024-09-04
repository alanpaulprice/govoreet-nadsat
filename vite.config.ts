import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@components": path.resolve(__dirname, "./src/components"),
			"@constants": path.resolve(__dirname, "./src/constants"),
			"@hooks": path.resolve(__dirname, "./src/hooks"),
			"@modules": path.resolve(__dirname, "./src/modules"),
			"@types": path.resolve(__dirname, "./src/types"),
			"@utilities": path.resolve(__dirname, "./src/utilities"),
		},
	},
});
