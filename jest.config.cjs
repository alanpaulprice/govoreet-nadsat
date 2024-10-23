module.exports = {
	transform: {
		"^.+\\.tsx?$": "babel-jest",
	},
	testEnvironment: "jsdom",
	moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
	moduleNameMapper: {
		"^@constants$": "<rootDir>/src/common/constants",
	},
};
