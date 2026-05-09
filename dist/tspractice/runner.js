"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const TSPractice_1 = require("./TSPractice");
// Get user input
const getMsg = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const result = new TSPractice_1.TSPractice([]);
getMsg.question("Enter number of array to be created: ", (answer) => {
    const n = Number(answer);
    if (isNaN(n) || n <= 0) {
        console.log("Invalid number");
        getMsg.close();
        return; // ✅ stop execution
    }
    console.log("Number is:", n);
    // Create input array
    const arr = [];
    for (let i = 0; i < n; i++) {
        let num = Math.floor(Math.random() * 10);
        if (!arr.includes(num)) {
            arr.push(num);
        }
    }
    console.log("Original array:", arr);
    // Call your function
    const result = new TSPractice_1.TSPractice(arr);
    console.log("Processed array:", result.bubbleSort());
    getMsg.close();
});
const data = [1, [2, [3, [4, [5]]]]];
console.log('============ flattend array : ', result.flattenNestedArr(data));
