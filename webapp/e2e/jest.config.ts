export default {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testMatch: ["**/steps/*.ts"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    moduleNameMapper:{"^uuid$": "uuid"},
    preset: "jest-puppeteer",
    collectCoverageFrom: ["../src/components/**"],
    testTimeout: 200000
}