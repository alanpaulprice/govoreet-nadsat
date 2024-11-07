module.exports = {
	transform: {
		"^.+\\.tsx?$": "babel-jest",
	},
	testEnvironment: "jsdom",
	moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
	moduleNameMapper: {
		"^@components$": "<rootDir>/src/common/components",
		"^@constants$": "<rootDir>/src/common/constants",
		"^@hooks$": "<rootDir>/src/common/hooks",
		"^@modules$": "<rootDir>/src/common/modules",
		"^@types$": "<rootDir>/src/common/types",
		"^@utilities$": "<rootDir>/src/common/utilities",
	},
};
