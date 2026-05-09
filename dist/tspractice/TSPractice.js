"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TSPractice = void 0;
class TSPractice {
    constructor(arr) {
        this.arr = arr;
    }
    bubbleSort() {
        for (let i = 0; i < this.arr.length; i++) {
            for (let j = 0; j < this.arr.length - 1; j++) {
                if (this.arr[j] > this.arr[j + 1]) {
                    const temp = this.arr[j];
                    this.arr[j] = this.arr[j + 1];
                    this.arr[j + 1] = temp;
                }
            }
        }
        return this.arr;
    }
    flattenNestedArr(arr) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            if (typeof (item) === "object" && item !== null && item.length !== undefined) {
                const flattItem = this.flattenNestedArr(item);
                for (let j = 0; j < flattItem.length; j++) {
                    result[result.length] = flattItem[j];
                }
            }
            else {
                result[result.length] = item;
            }
        }
        return result;
    }
}
exports.TSPractice = TSPractice;
